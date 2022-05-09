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
exports.authorizeUserMiddleWare = void 0;
const jwt_1 = require("../utils/jwt");
const logger_1 = require("../utils/logger");
const db_1 = require("../models/db");
const { User } = db_1.db;
const authorizeUserMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        logger_1.logger.info(">> getting authorization header >>");
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.toString();
        logger_1.logger.info(">> decoding token " + token + " >> ");
        const decoded = (0, jwt_1.decodeJWTToken)(token || "");
        const user = yield User.findOne({ username: decoded.session });
        const isExpired = decoded.expires < Date.now();
        if ((user !== null || user !== undefined) && !isExpired)
            return next();
        return res.status(403).json({ messsage: "Invalid jwt token" });
    }
    catch (e) {
        console.log(e);
        return res.status(403).json({ messsage: "Invalid jwt token" });
    }
});
exports.authorizeUserMiddleWare = authorizeUserMiddleWare;
