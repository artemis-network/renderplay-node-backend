import express from 'express';

const router = express.Router();

// middleware 
import { authorizeUserMiddleWare } from '../middlewares/authentication';

// controllers
import { getWalletController } from '../controllers/user/wallet.controller';
import { checkForAccountActivationController, verifyUserEmailController } from '../controllers/user/verification.controller';
import { createUserController, createGoogleUserController, loginUserController } from '../controllers/user/user.controller'


import { depositFundsController } from '../controllers/user/wallet.controller'

router.post('/api/v1/users/login', loginUserController);
router.post('/api/v1/users/register', createUserController);
router.post('/api/v1/users/google-login', createGoogleUserController);
router.get('/api/v1/users/test-token', authorizeUserMiddleWare, (req, res) => res.send("hello"));

router.post("/api/v1/users/activate-user", checkForAccountActivationController)
router.post("/api/v1/users/verify-user", verifyUserEmailController)

router.post("/api/v1/wallets", getWalletController)
router.post("/api/v1/wallets/deposit", depositFundsController)

export { router as userRoutes }