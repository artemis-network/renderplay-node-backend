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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRenderScanParticipants = exports.getRenderScanContestants = exports.saveRenderScanContestResult = exports.enterIntoRenderScanContest = void 0;
const db_1 = require("../../models/db");
const logger_1 = require("../../utils/logger");
const { User, UserWallet, RenderScan, RenderScanContest, RenderScanGameType, RenderScanResults, } = db_1.db;
const createRenderScan = (filename, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scan = yield RenderScan.create({
            fileUrl: filename,
            scan: "test",
            user: user
        });
        return scan;
    }
    catch (e) {
        logger_1.logger.error(e);
    }
});
const enterIntoRenderScanContest = (gameType, contestId, username, confirm) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ username: username });
        const contest = yield RenderScanContest.findById(contestId);
        const contestants = contest === null || contest === void 0 ? void 0 : contest.contestants;
        contestants === null || contestants === void 0 ? void 0 : contestants.map((contestant) => {
            if (String(contestant) === String(user === null || user === void 0 ? void 0 : user._id))
                return { message: "Paid", "error": false };
        });
        if (confirm) {
            const rendleGameType = yield RenderScanGameType.findOne({ gameType: gameType });
            const userWallet = (yield UserWallet.findOne({ user: user === null || user === void 0 ? void 0 : user._id })) || null;
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
            userWallet === null || userWallet === void 0 ? void 0 : userWallet.updateOne({
                balance: ((userWallet === null || userWallet === void 0 ? void 0 : userWallet.balance) - ((rendleGameType === null || rendleGameType === void 0 ? void 0 : rendleGameType.entryFee) || 0))
            });
            return { message: "success", error: false };
        }
        return { message: "user or contest does not exist", error: true };
    }
    catch (error) {
        logger_1.logger.error("error " + error);
        return { message: `something went wrong ${error}`, error: true };
    }
});
exports.enterIntoRenderScanContest = enterIntoRenderScanContest;
const getRenderScanContestants = (contestId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rendleContestants = yield RenderScanContest.findById(contestId);
        return { contest: rendleContestants };
    }
    catch (e) {
        return { contest: null };
    }
});
exports.getRenderScanContestants = getRenderScanContestants;
const saveRenderScanContestResult = (contestId, username, fileurl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ username: username });
        const renderScanContest = yield RenderScanContest.findById(contestId);
        const scan = yield createRenderScan(fileurl, user === null || user === void 0 ? void 0 : user._id);
        yield RenderScanResults.create({
            userId: user === null || user === void 0 ? void 0 : user._id,
            scanId: scan,
            contestId: renderScanContest === null || renderScanContest === void 0 ? void 0 : renderScanContest._id
        });
        return { message: "Successfully Posted" };
    }
    catch (error) {
        console.log(error);
        logger_1.logger.error("👎 " + error);
        return { message: "Something went wrong" };
    }
});
exports.saveRenderScanContestResult = saveRenderScanContestResult;
const getRenderScanParticipants = (contestId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield RenderScanResults.find();
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
exports.getRenderScanParticipants = getRenderScanParticipants;
