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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLogin = exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const logger_1 = require("../../utils/logger");
const token_1 = require("../../utils/token");
const jwt_1 = require("../../utils/jwt");
// import { EmailSender, getEmailVerificationHTML } from '../../utils/email'
const db_1 = require("../../models/db");
const { User, UserWallet } = db_1.db;
// const sendVerificationEmailForUser = async (token: string, email: string, username: string) => {
// 	try {
// 		logger.info(">> sending verification email to " + username + " >> ");
// 		const html: string = getEmailVerificationHTML("");
// 		const emailSender: EmailSender = new EmailSender();
// 		emailSender.sendEmailVerificationEmail("contact@renderverse.io", email, "Verify Email", "", html.toString());
// 		logger.info(">> verification email has sent to " + username + " >> ");
// 	} catch (e) {
// 		logger.error(e);
// 		throw new Error()
// 	}
// }
const createWalletForUser = (user_id) => {
    logger_1.logger.info(">> creating wallet for" + user_id + " >> ");
    const userWalletInput = {
        balance: 0,
        isActive: true,
        user: user_id
    };
    UserWallet.create(userWalletInput).then((wallet) => {
        logger_1.logger.info(">> wallet created for " + user_id + " >> ");
    }).catch((err) => {
        logger_1.logger.info(">> Error " + user_id + " >> " + err);
    });
};
const createUser = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.logger.info(">> creating user " + username + " >> ");
        logger_1.logger.info(">> creating token for " + username + " >> ");
        const token = (0, token_1.createToken)();
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const userInput = {
            username: username,
            email: email,
            password: hash,
            isActivated: false,
            isGoogleAccount: false,
            isVerified: false,
            token: token
        };
        const newUser = yield User.create(userInput);
        logger_1.logger.info(">> user created " + username + " >> ");
        createWalletForUser(newUser._id);
        const result = {
            message: "Success",
            errorType: "NONE",
            error: false,
            status: 200
        };
        return result;
    }
    catch (err) {
        logger_1.logger.error(err);
        if (err.code === 11000) {
            const error = {
                message: "username or email already in use",
                errorType: "USER_ALREADY_EXIST",
                error: true,
                status: 500
            };
            return error;
        }
    }
});
exports.createUser = createUser;
const loginUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.logger.info(">> authenticating user " + username + " >> ");
        const user = yield User.findOne({ $or: [{ username: username }, { email: username }] });
        const authorized = bcrypt_1.default.compareSync(password, (user === null || user === void 0 ? void 0 : user.password.toString()) || "");
        logger_1.logger.info(">> checking password" + " >> ");
        if (!authorized) {
            logger_1.logger.info(">> invalid username or password " + " >> ");
            const response = {
                message: "invalid username or password",
                status: 500,
                errorType: "INVALID_CRENDENTAILS",
                error: true
            };
            return response;
        }
        // !fix the email issue and uncomment this code
        http: //localhost:3000/api/v1/users/register
         logger_1.logger.info(">> password matched " + " >> ");
        // if (!user?.isVerified) {
        // 	logger.info(">> user email not verified " + " >> ");
        // 	const response: Result = {
        // 		error: true,
        // 		message: "verify email, to login",
        // 		errorType: "UNAUTHORIZED_EMAIL",
        // 		status: 401
        // 	}
        // 	return response;
        // }
        logger_1.logger.info(">> verified user email " + " >> ");
        logger_1.logger.info(">> authentication successfully " + username + " >> ");
        logger_1.logger.info(">> generating token " + username + " >> ");
        const token = (0, jwt_1.generateJWTToken)(username);
        logger_1.logger.info(">> sending resposne " + username + " >> ");
        const result = {
            error: false,
            message: "SUCCESS",
            userId: user === null || user === void 0 ? void 0 : user._id,
            username: user === null || user === void 0 ? void 0 : user.username,
            email: user === null || user === void 0 ? void 0 : user.email,
            accessToken: token,
            publicToken: "[ADMIN]",
            errorType: 'NONE',
            status: 0
        };
        return result;
    }
    catch (err) {
        logger_1.logger.error(err);
        const response = {
            errorType: "INVALID_CREDENTIALS",
            message: "Username/Email does not exists",
            status: 500,
            error: true
        };
        return response;
    }
});
exports.loginUser = loginUser;
const googleLogin = (email, username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.logger.info(">> creating user " + username + " >> ");
        logger_1.logger.info(">> creating token for " + username + " >> ");
        const userInput = {
            username: username,
            email: email,
            password: "",
            isActivated: false,
            isGoogleAccount: true,
            isVerified: false,
            token: ""
        };
        const newUser = yield User.create(userInput);
        logger_1.logger.info(">> user created " + username + " >> ");
        createWalletForUser(newUser._id);
        logger_1.logger.info(">> authentication successfully " + username + " >> ");
        logger_1.logger.info(">> generating token " + username + " >> ");
        const token = (0, jwt_1.generateJWTToken)("username");
        logger_1.logger.info(">> sending resposne " + username + " >> ");
        const result = {
            error: false,
            userId: newUser._id,
            message: "SUCCESS",
            username: newUser.username,
            errorType: "NONE",
            email: newUser.email,
            accessToken: token,
            publicToken: "[ADMIN]",
            status: 200
        };
        return result;
    }
    catch (err) {
        logger_1.logger.error(err);
        if (err["code"] === 11000) {
            const user = yield User.findOne({ email: email });
            logger_1.logger.info(">> generating token " + username + " >> ");
            const token = (0, jwt_1.generateJWTToken)(username);
            logger_1.logger.info(">> sending resposne " + username + " >> ");
            const response = {
                error: false,
                userId: user === null || user === void 0 ? void 0 : user._id,
                message: "SUCCESS",
                username: username,
                email: email,
                accessToken: token,
                publicToken: "[ADMIN]",
                status: 200,
                errorType: "NONE"
            };
            return response;
        }
    }
});
exports.googleLogin = googleLogin;
