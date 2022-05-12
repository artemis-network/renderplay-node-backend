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
exports.initUser = void 0;
const db_1 = require("../models/db");
const user_service_1 = require("../services/user/user.service");
const wallet_service_1 = require("../services/user/wallet.service");
const logger_1 = require("../utils/logger");
const { User } = db_1.db;
const initUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deposit = 1000000;
        logger_1.logger.info(">> checking for user collection");
        const users = yield (yield User.find()).length;
        if (users <= 0) {
            logger_1.logger.info(">> create initial user");
            const user = yield (0, user_service_1.createUser)("admin", "admin@admin.io", "admin@123");
            logger_1.logger.info(`>> depositing funds (${deposit}) to ${user === null || user === void 0 ? void 0 : user._id}`);
            const details = yield (0, wallet_service_1.depositFunds)(user === null || user === void 0 ? void 0 : user._id, deposit);
            console.log(details);
            logger_1.logger.info(">> successfully created user");
        }
    }
    catch (e) {
        return e;
    }
});
exports.initUser = initUser;
