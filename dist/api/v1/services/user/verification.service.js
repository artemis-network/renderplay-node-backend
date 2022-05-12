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
exports.verifyUserEmail = exports.checkForAccountActivation = void 0;
const db_1 = require("../../models/db");
const activationCodes_1 = require("../../data/activationCodes");
const { User } = db_1.db;
const checkForAccountActivation = (username, code) => __awaiter(void 0, void 0, void 0, function* () {
    const response = {
        error: false,
        message: "account activated",
        isActivated: true
    };
    const error = {
        error: true,
        message: "invalid activation code",
        isActivated: false
    };
    try {
        const user = yield User.findOne({ username: username });
        if (!(user === null || user === void 0 ? void 0 : user.$isEmpty)) {
            if (user === null || user === void 0 ? void 0 : user.isActivated)
                return response;
            for (let c in activationCodes_1.activationCodes) {
                if (c === code) {
                    yield (user === null || user === void 0 ? void 0 : user.update({
                        $set: {
                            isActivated: true
                        }
                    }));
                    yield (user === null || user === void 0 ? void 0 : user.save());
                    return response;
                }
            }
            return error;
        }
        return error;
    }
    catch (e) {
        return error;
    }
});
exports.checkForAccountActivation = checkForAccountActivation;
const verifyUserEmail = (username, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ username: username });
        if (!(user === null || user === void 0 ? void 0 : user.$isEmpty)) {
            if ((user === null || user === void 0 ? void 0 : user.token) === token) {
                user === null || user === void 0 ? void 0 : user.update({
                    $set: {
                        token: "",
                        isVerified: true,
                    }
                });
                yield (user === null || user === void 0 ? void 0 : user.save());
                return { message: "email verified", error: false };
            }
            return { message: "invalid token", error: true };
        }
        return { message: "user does not exits", error: true };
    }
    catch (e) {
        return { message: "something went wrong", error: true };
    }
});
exports.verifyUserEmail = verifyUserEmail;
