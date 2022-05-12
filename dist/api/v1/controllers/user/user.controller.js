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
exports.loginUserController = exports.createGoogleUserController = exports.createUserController = void 0;
const user_service_1 = require("../../services/user/user.service");
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, } = req.body;
        const result = yield (0, user_service_1.createUser)(username, email, password);
        return res.status(200).json(result);
    }
    catch (e) {
        return res.status(200).json(e);
    }
});
exports.createUserController = createUserController;
const createGoogleUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        const result = yield (0, user_service_1.googleLogin)(token);
        return res.status(200).json(result);
    }
    catch (e) {
        return res.status(200).json(e);
    }
});
exports.createGoogleUserController = createGoogleUserController;
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const result = yield (0, user_service_1.loginUser)(username, password);
        return res.status(200).json(result);
    }
    catch (e) {
        return res.status(200).json(e);
    }
});
exports.loginUserController = loginUserController;
