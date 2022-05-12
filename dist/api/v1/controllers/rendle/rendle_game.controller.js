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
exports.initializeRendleGamesController = exports.getRendleGameStatusController = exports.getRendleContestantsController = exports.getRendleParticipantsController = exports.saveRendleContestResultController = exports.enterRendlesContestController = exports.resetRendlesGameTypesController = exports.getRendleGameTypesController = void 0;
const rendle_services_1 = require("../../services/rendle/rendle.services");
const rendle_init_1 = require("../../bootstrap/rendle_init");
const initializeRendleGamesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, rendle_init_1.initializeRendleGames)();
        return { message: "SUCCESSFULLY INITIALIZED" };
    }
    catch (e) {
        return { message: "SOMETHING WENT WRONG" };
    }
});
exports.initializeRendleGamesController = initializeRendleGamesController;
const getRendleGameTypesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rendles = yield (0, rendle_services_1.getRendleGameTypes)();
        return res.status(200).json(rendles);
    }
    catch (e) {
        return res.status(200).json(e);
    }
});
exports.getRendleGameTypesController = getRendleGameTypesController;
const resetRendlesGameTypesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, rendle_services_1.resetRendlesGameTypes)();
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(200).json({ message: "Not OK" });
    }
});
exports.resetRendlesGameTypesController = resetRendlesGameTypesController;
const enterRendlesContestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gameType, contestId, userId, confirm } = req.body;
        const response = yield (0, rendle_services_1.enterIntoRendleContest)(gameType, contestId, userId, confirm);
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(200).json({ message: "Not OK" });
    }
});
exports.enterRendlesContestController = enterRendlesContestController;
const saveRendleContestResultController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gameType, contestId, username, chances, isWon } = req.body;
        const response = yield (0, rendle_services_1.saveRendleContestResult)(gameType, contestId, username, chances, isWon);
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(200).json({ message: error });
    }
});
exports.saveRendleContestResultController = saveRendleContestResultController;
const getRendleParticipantsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contestId, } = req.body;
        const response = yield (0, rendle_services_1.getRendleParticipants)(contestId);
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(200).json({ message: error });
    }
});
exports.getRendleParticipantsController = getRendleParticipantsController;
const getRendleContestantsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contestId } = req.body;
        const response = yield (0, rendle_services_1.getRendleContestants)(contestId);
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(200).json({ message: error });
    }
});
exports.getRendleContestantsController = getRendleContestantsController;
const getRendleGameStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, contestId, gameType } = req.body;
        const response = yield (0, rendle_services_1.getRendleGameStatus)(userId, contestId, gameType);
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(200).json({ message: error });
    }
});
exports.getRendleGameStatusController = getRendleGameStatusController;
