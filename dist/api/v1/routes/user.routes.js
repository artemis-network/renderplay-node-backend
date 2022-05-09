"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.userRoutes = router;
// middleware 
const authentication_1 = require("../middlewares/authentication");
// controllers
const wallet_controller_1 = require("../controllers/user/wallet.controller");
const verification_controller_1 = require("../controllers/user/verification.controller");
const user_controller_1 = require("../controllers/user/user.controller");
const wallet_controller_2 = require("../controllers/user/wallet.controller");
router.post('/api/v1/users/login', user_controller_1.loginUserController);
router.post('/api/v1/users/register', user_controller_1.createUserController);
router.post('/api/v1/users/google-login', user_controller_1.createGoogleUserController);
router.get('/api/v1/users/test-token', authentication_1.authorizeUserMiddleWare, (req, res) => res.send("hello"));
router.post("/api/v1/users/activate-user", verification_controller_1.checkForAccountActivationController);
router.post("/api/v1/users/verify-user", verification_controller_1.verifyUserEmailController);
router.post("/api/v1/wallets", wallet_controller_1.getWalletController);
router.post("/api/v1/wallets/deposit", wallet_controller_2.depositFundsController);
