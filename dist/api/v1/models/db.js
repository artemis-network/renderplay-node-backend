"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../utils/logger");
const user_model_1 = require("./user.model");
const wallet_model_1 = require("./wallet.model");
const rendle_game_type_model_1 = require("./rendle_game_type.model");
const rendle_contest_model_1 = require("./rendle_contest.model");
const rendle_results_model_1 = require("./rendle_results.model");
const rendervers_emails_model_1 = require("./rendervers_emails.model");
const rendle_game_state_model_1 = require("./rendle_game_state.model");
mongoose_1.default
    .connect('mongodb://artemisnetwork:Artemis%40123@3.108.106.111:27017/renderverse?authMechanism=DEFAULT', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => logger_1.logger.info("🚀  Database connection initialized..."))
    .catch((err) => logger_1.logger.error("👉  Database connection failed... " + err));
mongoose_1.default
    .connection
    .on('open', () => logger_1.logger.info('🚀  Database connected Successfully'))
    .on('error', (err) => logger_1.logger.error("👉  Error" + err))
    .on('disconnected', () => console.warn('🚨  Database disconnected...'));
const db = {
    mongoose: mongoose_1.default,
    User: user_model_1.User,
    Words: rendle_game_state_model_1.Words,
    UserWallet: wallet_model_1.UserWallet,
    RendleResult: rendle_results_model_1.RendleResult,
    RendleContest: rendle_contest_model_1.RendleContest,
    RendleGameType: rendle_game_type_model_1.RendleGameType,
    RendleGameState: rendle_game_state_model_1.RendleGameState,
    RenderverseEmails: rendervers_emails_model_1.RenderverseEmails,
};
exports.db = db;
