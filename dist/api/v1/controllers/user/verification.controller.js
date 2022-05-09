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
exports.verifyUserEmailController = exports.checkForAccountActivationController = void 0;
const verification_service_1 = require("../../services/user/verification.service");
const checkForAccountActivationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, code } = req.body;
        const result = yield (0, verification_service_1.checkForAccountActivation)(username, code);
        res.status(200).json(result);
    }
    catch (e) {
        res.status(200).json(e);
    }
});
exports.checkForAccountActivationController = checkForAccountActivationController;
const verifyUserEmailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, token } = req.body;
        const result = yield (0, verification_service_1.verifyUserEmail)(username, token);
        res.status(200).json(result);
    }
    catch (e) {
        res.status(200).json(e);
    }
});
exports.verifyUserEmailController = verifyUserEmailController;
