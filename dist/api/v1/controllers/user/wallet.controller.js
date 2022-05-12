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
exports.depositFundsController = exports.getWalletController = void 0;
const wallet_service_1 = require("../../services/user/wallet.service");
const getWalletController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const result = yield (0, wallet_service_1.getWallet)(userId);
        return res.status(200).json(result);
    }
    catch (e) {
        return res.status(200).json(e);
    }
});
exports.getWalletController = getWalletController;
const depositFundsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, amount, password } = req.body;
        if (password === "password@1234") {
            const result = yield (0, wallet_service_1.depositFunds)(userId, amount);
            return res.status(200).json(result);
        }
        return res.status(200).json({ message: "invalid password", error: true });
    }
    catch (e) {
        return res.status(200).json(e);
    }
});
exports.depositFundsController = depositFundsController;
