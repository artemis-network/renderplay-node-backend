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
exports.depositFunds = exports.getWallet = void 0;
const db_1 = require("../../models/db");
const { User, UserWallet } = db_1.db;
const getWallet = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ username: username });
        const wallet = yield UserWallet.findOne({ user: user === null || user === void 0 ? void 0 : user._id });
        const result = {
            error: false,
            message: "SUCCESS",
            balance: wallet === null || wallet === void 0 ? void 0 : wallet.balance,
        };
        return result;
    }
    catch (e) {
        throw new Error();
    }
});
exports.getWallet = getWallet;
const depositFunds = (username, amount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ username: username });
        const wallet = yield UserWallet.findOne({ user: user === null || user === void 0 ? void 0 : user._id });
        yield (wallet === null || wallet === void 0 ? void 0 : wallet.update({
            $set: {
                balance: ((wallet === null || wallet === void 0 ? void 0 : wallet.balance) + amount)
            }
        }));
        yield (wallet === null || wallet === void 0 ? void 0 : wallet.save());
        return { message: "Funds Added!", balance: wallet === null || wallet === void 0 ? void 0 : wallet.balance };
    }
    catch (e) {
        throw new Error("");
    }
});
exports.depositFunds = depositFunds;
