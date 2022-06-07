import express from 'express';

const router = express.Router();

// middleware 
import { authorizeUserMiddleWare } from '../middlewares/jwtTokenAuthenticator.middleware';

// controllers
import { getWalletController } from './controllers/wallet.controller';
import { checkForAccountActivationController, verifyUserEmailController } from './controllers/verification.controller';
import { createUserController, createGoogleUserController, createMobileGoogleUserController, loginUserController } from './controllers/user.controller'
import { userInitController } from './controllers/user_init.controller'


import { depositFundsController } from './controllers/wallet.controller'

import { userPrefix, walletPrefix } from '../config'

router.post(`${userPrefix}/init`, userInitController);
router.post(`${userPrefix}/login`, loginUserController);
router.post(`${userPrefix}/register`, createUserController);
router.post(`${userPrefix}/google-login`, createGoogleUserController);
router.post(`${userPrefix}/google-mobile-login`, createMobileGoogleUserController);
router.get(`${userPrefix}/test-token`, authorizeUserMiddleWare, (req, res) => res.send("hello"));

router.post(`${userPrefix}/users/activate-user`, checkForAccountActivationController)
router.post(`${userPrefix}/users/verify-user`, verifyUserEmailController)

router.post(`${walletPrefix}`, getWalletController)
router.post(`${walletPrefix}/deposit`, depositFundsController)

export { router as userRoutes }