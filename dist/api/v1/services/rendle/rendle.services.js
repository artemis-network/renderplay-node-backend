"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRendleGameStatus = exports.getRendleContestants = exports.getRendleParticipants = exports.saveRendleContestResult = exports.enterIntoRendleContest = exports.resetRendlesGameTypes = exports.getRendleGameTypes = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../../utils/logger");
const db_1 = require("../../models/db");
const { RendleGameType, RendleContest, User, UserWallet, RendleResult, } = db_1.db;
const createRendleContest = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const input = {
            minimumContestants: 1,
            prizePool: 0
        };
        const contest = yield RendleContest.create(input);
        return contest._id;
    }
    catch (e) {
        logger_1.logger.error(e);
    }
});
const getRendleGameTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rendles = yield RendleGameType.find().sort({ gameType: 1 });
        return { rendleGameTypes: rendles };
    }
    catch (e) {
        return [];
    }
});
exports.getRendleGameTypes = getRendleGameTypes;
const resetRendlesGameTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await Words.collection.drop()
        // await RendleGameState.collection.drop()
        const rendles = yield RendleGameType.find().sort({ gameType: 1 });
        rendles.map((rendle, index) => __awaiter(void 0, void 0, void 0, function* () {
            if (rendle.isExpired === true) {
                if (index === rendles.length - 1) {
                    //* first game expires
                    yield rendles[0].updateOne({
                        $set: {
                            isExpired: true,
                            startsOn: null,
                            contestId: null,
                        }
                    });
                    yield rendles[0].save();
                    //* second game goes live
                    yield rendles[index - 1].updateOne({
                        $set: {
                            isExpired: false,
                            startsOn: Date.now(),
                        }
                    });
                    yield rendles[index - 1].save();
                }
                else if (index == 0) {
                    //* expire the next game
                    yield rendles[index + 1].updateOne({
                        $set: {
                            isExpired: true,
                            startsOn: null,
                            contestId: null
                        }
                    });
                    yield rendles[index + 1].save();
                    //* live the last game
                    yield rendles[index + 2].updateOne({
                        $set: {
                            isExpired: false,
                            startsOn: Date.now()
                        }
                    });
                    yield rendles[index + 2].save();
                }
                else {
                    // expiring next game
                    yield rendles[index + 1].updateOne({
                        $set: {
                            isExpired: true,
                            startsOn: null,
                            contestId: null
                        }
                    });
                    yield rendles[index + 1].save();
                    // live first game
                    yield rendles[0].updateOne({
                        $set: {
                            isExpired: false,
                            startsOn: Date.now()
                        }
                    });
                    yield rendles[0].save();
                }
                const rendleContest = yield createRendleContest();
                const now = new Date(Date.now());
                const fourHours = 60 * 60 * 4 * 1000;
                let newTime = new Date(now.getTime() + fourHours).toUTCString();
                newTime = new Date(newTime);
                yield rendles[index].updateOne({
                    $set: {
                        isExpired: false,
                        contestId: rendleContest,
                        startsOn: newTime,
                    }
                });
                yield rendles[index].save();
            }
        }));
        return { message: `Reset of Rendle ${rendles[0].gameType} successful` };
    }
    catch (e) {
        logger_1.logger.error(e);
        return { message: `Error => ${e}` };
    }
});
exports.resetRendlesGameTypes = resetRendlesGameTypes;
const enterIntoRendleContest = (gameType, contestId, userId, confirm) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(userId);
        const contest = yield RendleContest.findById(contestId);
        const contestants = contest === null || contest === void 0 ? void 0 : contest.contestants;
        const contestant = contestants === null || contestants === void 0 ? void 0 : contestants.find((contestant) => String(contestant) === String(userId));
        if (contestant)
            return { message: "PAID", "error": false };
        if (confirm) {
            const rendleGameType = yield RendleGameType.findOne({ gameType: gameType });
            const userWallet = (yield UserWallet.findOne({ user: userId })) || null;
            if (((rendleGameType === null || rendleGameType === void 0 ? void 0 : rendleGameType.entryFee) || 0) > ((userWallet === null || userWallet === void 0 ? void 0 : userWallet.balance) || 0))
                return { message: "insufficent funds", error: true };
            contestants === null || contestants === void 0 ? void 0 : contestants.push(user);
            yield (contest === null || contest === void 0 ? void 0 : contest.updateOne({
                $set: {
                    contestants: contestants,
                    prizePool: (contest === null || contest === void 0 ? void 0 : contest.prizePool) + ((rendleGameType === null || rendleGameType === void 0 ? void 0 : rendleGameType.entryFee) || 0)
                }
            }));
            yield (contest === null || contest === void 0 ? void 0 : contest.save());
            yield (userWallet === null || userWallet === void 0 ? void 0 : userWallet.updateOne({
                balance: ((userWallet === null || userWallet === void 0 ? void 0 : userWallet.balance) - ((rendleGameType === null || rendleGameType === void 0 ? void 0 : rendleGameType.entryFee) || 0))
            }));
            return { message: "OK", error: false };
        }
        return { message: "OK", error: false };
    }
    catch (error) {
        logger_1.logger.error("error " + error);
        return { message: `something went wrong ${error}`, error: true };
    }
});
exports.enterIntoRendleContest = enterIntoRendleContest;
const getRendleContestants = (contestId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rendleContestants = yield RendleContest.findById(contestId);
        return { contest: rendleContestants };
    }
    catch (e) {
        return { contest: null };
    }
});
exports.getRendleContestants = getRendleContestants;
const saveRendleContestResult = (gameType, contestId, username, chances, isWon) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ username: username });
        const rendle = yield RendleGameType.findOne({ contestId: contestId });
        const contest = mongoose_1.default.Types.ObjectId(contestId);
        const rendleContest = yield RendleContest.findById(contest);
        yield RendleResult.create({
            user: user === null || user === void 0 ? void 0 : user._id,
            gameType: gameType,
            chances: chances,
            isWon: isWon,
            completedOn: Date.now(),
            startedOn: rendle === null || rendle === void 0 ? void 0 : rendle.startsOn,
            contestId: rendleContest === null || rendleContest === void 0 ? void 0 : rendleContest._id
        });
        // await RendleGameState.findOneAndRemove({ user: user?._id })
        return { message: "Successfully Posted" };
    }
    catch (error) {
        console.log(error);
        logger_1.logger.error("👎 " + error);
        return { message: "Something went wrong" };
    }
});
exports.saveRendleContestResult = saveRendleContestResult;
const getRendleParticipants = (contestId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield RendleResult.find();
        const participants = [];
        results.map((result) => {
            const _id = String(result === null || result === void 0 ? void 0 : result.contestId);
            if (_id === contestId)
                participants.push(result);
        });
        return { participants: participants };
    }
    catch (error) {
        return [];
    }
});
exports.getRendleParticipants = getRendleParticipants;
const getRendleGameStatus = (userId, contestId, gameType) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const contest = yield RendleContest.findById(contestId);
        const status = (_a = contest === null || contest === void 0 ? void 0 : contest.contestants) === null || _a === void 0 ? void 0 : _a.find((result) => String(userId) === String(result === null || result === void 0 ? void 0 : result._id));
        const result = yield RendleResult.findOne({ user: userId });
        if (result === null)
            return { isFirstGame: false };
        else
            return {
                id: result === null || result === void 0 ? void 0 : result._id,
                gameType: gameType,
                startsOn: result === null || result === void 0 ? void 0 : result.startedOn,
                completedOn: result === null || result === void 0 ? void 0 : result.completedOn,
                isWon: result.isWon,
                contestId: result.contestId,
                isFirstGame: false
            };
    }
    catch (e) {
        return { message: e };
    }
});
exports.getRendleGameStatus = getRendleGameStatus;
