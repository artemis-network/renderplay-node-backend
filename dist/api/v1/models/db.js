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
const rendervers_emails_model_1 = require("./rendervers_emails.model");
const rendle_word_model_1 = require("./rendles/rendle_word.model");
const rendle_contest_model_1 = require("./rendles/rendle_contest.model");
const rendle_results_model_1 = require("./rendles/rendle_results.model");
const rendle_game_type_model_1 = require("./rendles/rendle_game_type.model");
const rendle_game_state_model_1 = require("./rendles/rendle_game_state.model");
const renderscan_model_1 = require("./renderscan/renderscan.model");
const renderscan_ref_word_modal_1 = require("./renderscan/renderscan_ref_word.modal");
const renderscan_results_1 = require("./renderscan/renderscan_results");
const renderscan_contests_model_1 = require("./renderscan/renderscan_contests.model");
const renderscan_game_type_modal_1 = require("./renderscan/renderscan_game_type.modal");
const config_1 = require("../../../config");
mongoose_1.default
    .connect(config_1.MONGO_DB_URL, {
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
    .on('disconnected', () => logger_1.logger.warn('🚨  Database disconnected...'));
const db = {
    mongoose: mongoose_1.default,
    // User Modals
    User: user_model_1.User,
    UserWallet: wallet_model_1.UserWallet,
    // Rendle Models
    RendleWord: rendle_word_model_1.RendleWord,
    RendleResult: rendle_results_model_1.RendleResult,
    RendleContest: rendle_contest_model_1.RendleContest,
    RendleGameType: rendle_game_type_model_1.RendleGameType,
    RendleGameState: rendle_game_state_model_1.RendleGameState,
    RenderverseEmails: rendervers_emails_model_1.RenderverseEmails,
    // Renderscan models
    RenderScan: renderscan_model_1.RenderScan,
    RenderScanResults: renderscan_results_1.RenderScanResults,
    RenderScanContest: renderscan_contests_model_1.RenderScanContest,
    RenderScanRefWord: renderscan_ref_word_modal_1.RenderScanRefWord,
    RenderScanGameType: renderscan_game_type_modal_1.RenderScanGameType,
};
exports.db = db;
