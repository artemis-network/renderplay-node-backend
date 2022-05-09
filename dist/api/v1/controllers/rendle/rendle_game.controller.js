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
exports.getRendleParticipantsController = exports.saveRendleContestResultController = exports.enterRendlesContestController = exports.resetRendlesGameTypesController = exports.getRendleGameTypesController = void 0;
const rendle_services_1 = require("../../services/rendle/rendle.services");
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
        const { gameType, contestId, username, confirm } = req.body;
        const response = yield (0, rendle_services_1.enterIntoRendleContest)(gameType, contestId, username, confirm);
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
