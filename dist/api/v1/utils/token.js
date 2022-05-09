"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const createToken = () => {
    try {
        return crypto_1.default.randomBytes(32).toString("hex");
    }
    catch (e) {
        throw new Error("Error");
    }
};
exports.createToken = createToken;
