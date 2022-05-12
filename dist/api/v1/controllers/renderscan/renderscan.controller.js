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
exports.getRenderScanParticipantsController = exports.getRenderScanContestantsController = exports.enterIntoRenderScanContestController = exports.saveRenderScanContestResultController = exports.initializeRenderScanGamesController = void 0;
const renderscan_init_1 = require("../../bootstrap/renderscan_init");
const renderscan_services_1 = require("../../services/renderscan/renderscan.services");
const initializeRenderScanGamesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { word } = req.body;
        const image = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.destination) + "/" + ((_b = req.file) === null || _b === void 0 ? void 0 : _b.filename) || '';
        const refWord = {
            word,
            image
        };
        const response = yield (0, renderscan_init_1.initializeRenderScanGames)(refWord);
        res.status(200).json(response);
    }
    catch (e) {
        res.status(200).json(e);
    }
});
exports.initializeRenderScanGamesController = initializeRenderScanGamesController;
const enterIntoRenderScanContestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gameType, contestId, username, confirm } = req.body;
        const response = yield (0, renderscan_services_1.enterIntoRenderScanContest)(gameType, contestId, username, confirm);
        return res.status(200).json(response);
    }
    catch (e) {
        return res.status(200).json(e);
    }
});
exports.enterIntoRenderScanContestController = enterIntoRenderScanContestController;
const saveRenderScanContestResultController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const { contestId, username } = req.body;
        const fileurl = ((_c = req.file) === null || _c === void 0 ? void 0 : _c.destination) + "/" + ((_d = req.file) === null || _d === void 0 ? void 0 : _d.filename) || '';
        const response = yield (0, renderscan_services_1.saveRenderScanContestResult)(contestId, username, fileurl);
        return res.status(200).json(response);
    }
    catch (e) {
        return res.status(200).json(e);
    }
});
exports.saveRenderScanContestResultController = saveRenderScanContestResultController;
const getRenderScanContestantsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contestId } = req.body;
        const response = yield (0, renderscan_services_1.getRenderScanContestants)(contestId);
        return res.status(200).json(response);
    }
    catch (e) {
        return res.status(200).json(e);
    }
});
exports.getRenderScanContestantsController = getRenderScanContestantsController;
const getRenderScanParticipantsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contestId } = req.body;
        const response = yield (0, renderscan_services_1.getRenderScanParticipants)(contestId);
        return res.status(200).json(response);
    }
    catch (e) {
        return res.status(200).json(e);
    }
});
exports.getRenderScanParticipantsController = getRenderScanParticipantsController;
