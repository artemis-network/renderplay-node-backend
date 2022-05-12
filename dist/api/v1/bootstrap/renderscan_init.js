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
exports.initializeRenderScanGames = void 0;
const renderscanGameTypes_1 = require("../data/renderscanGameTypes");
const db_1 = require("../models/db");
const logger_1 = require("../utils/logger");
const { RenderScanGameType, RenderScanContest, RenderScanRefWord } = db_1.db;
const createRenderScanRefWord = (renderScanRefWordInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refWord = yield RenderScanRefWord.create(renderScanRefWordInput);
        return refWord === null || refWord === void 0 ? void 0 : refWord._id;
    }
    catch (error) {
        logger_1.logger.error(">> Error " + error);
    }
});
const createRenderScanContest = (renderScanRefWordAsInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refWord = yield createRenderScanRefWord(renderScanRefWordAsInput);
        const input = {
            minimumContestants: 1,
            prizePool: 0,
            refWord: refWord === null || refWord === void 0 ? void 0 : refWord._id
        };
        const contest = yield RenderScanContest.create(input);
        return contest._id;
    }
    catch (e) {
        logger_1.logger.error(e);
    }
});
const createRenderScanGameTypes = (renderScanGameType, renderScanRefWordAsInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!renderScanGameType.isExpired) {
            const contestId = yield createRenderScanContest(renderScanRefWordAsInput);
            const input = {
                gameType: renderScanGameType.gameType,
                startsOn: renderScanGameType.startsOn,
                isExpired: renderScanGameType.isExpired,
                entryFee: renderScanGameType.entryFee,
                contestId: contestId
            };
            yield RenderScanGameType.create(input);
        }
        else {
            const input = {
                gameType: renderScanGameType.gameType,
                startsOn: renderScanGameType.startsOn,
                isExpired: renderScanGameType.isExpired,
                entryFee: renderScanGameType.entryFee,
                contestId: ""
            };
            yield RenderScanGameType.create(input);
        }
    }
    catch (e) {
        logger_1.logger.error(e);
    }
});
const initializeRenderScanGames = (renderScanRefWordAsInput) => __awaiter(void 0, void 0, void 0, function* () {
    yield RenderScanGameType.collection.drop();
    const count = yield (yield RenderScanGameType.find()).length;
    if (count <= 0) {
        renderscanGameTypes_1.renderscanGameTypes.map((renderScanGameType) => {
            createRenderScanGameTypes(renderScanGameType, renderScanRefWordAsInput);
        });
    }
});
exports.initializeRenderScanGames = initializeRenderScanGames;
