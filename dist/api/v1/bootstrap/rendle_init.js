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
exports.initializeRendleGames = void 0;
const rendleGameTypes_1 = require("../data/rendleGameTypes");
const db_1 = require("../models/db");
const logger_1 = require("../utils/logger");
const { RendleGameType, RendleContest } = db_1.db;
const createRendleContest = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.logger.info(`>> creating new contest`);
        const input = {
            minimumContestants: 1,
            prizePool: 0
        };
        const contest = yield RendleContest.create(input);
        logger_1.logger.info(`>> successfully created contest`);
        return contest._id;
    }
    catch (e) {
        logger_1.logger.error(e);
    }
});
const createRendleGameType = (rendleGameType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.logger.info(`>> creating rendle ${rendleGameType.gameType}`);
        if (!rendleGameType.isExpired) {
            const contestId = yield createRendleContest();
            const input = {
                gameType: rendleGameType.gameType,
                startsOn: rendleGameType.startsOn,
                isExpired: rendleGameType.isExpired,
                entryFee: rendleGameType.entryFee,
                contestId: contestId
            };
            yield RendleGameType.create(input);
        }
        else {
            const input = {
                gameType: rendleGameType.gameType,
                startsOn: rendleGameType.startsOn,
                isExpired: rendleGameType.isExpired,
                entryFee: rendleGameType.entryFee,
                contestId: ""
            };
            yield RendleGameType.create(input);
        }
        logger_1.logger.info(`>> created rendle ${rendleGameType.gameType}`);
    }
    catch (e) {
        logger_1.logger.error(e);
    }
});
const initializeRendleGames = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info(">> checking for rendles collection");
    const count = yield (yield RendleGameType.find()).length;
    if (count <= 0) {
        logger_1.logger.info(">> creating rendles");
        rendleGameTypes_1.rendleGameTypes.map((rendleGameType) => {
            createRendleGameType(rendleGameType);
        });
    }
});
exports.initializeRendleGames = initializeRendleGames;
