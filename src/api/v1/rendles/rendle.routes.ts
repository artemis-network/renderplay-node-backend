import express from 'express';

import { rendlesInit, destoryRendle } from './controllers/rendle_init.controller'
import { RendleResetController } from './controllers/rendle_reset_contests.controller'

import { RendleContestController } from './controllers/rendle_contest.controller'

import { adminAuthenticatorMiddleWare } from '../middlewares/adminAuthenticator.middleware'
import { authorizeUserMiddleWare } from '../middlewares/jwtTokenAuthenticator.middleware'

import { rendlesPrefix } from '../config'

const router = express.Router();

router.post(`${rendlesPrefix}/init`, adminAuthenticatorMiddleWare, rendlesInit);
router.post(`${rendlesPrefix}/destroy`, adminAuthenticatorMiddleWare, destoryRendle);
router.post(`${rendlesPrefix}/reset`, adminAuthenticatorMiddleWare, RendleResetController.resetContests);
router.post(`${rendlesPrefix}/getanswer`, adminAuthenticatorMiddleWare, RendleContestController.getContestSolution);

router.get(rendlesPrefix, RendleContestController.getContests);

router.post(`${rendlesPrefix}/enter`, authorizeUserMiddleWare, RendleContestController.enterContest);
router.post(`${rendlesPrefix}/save`, authorizeUserMiddleWare, RendleContestController.saveContestResult);
router.post(`${rendlesPrefix}/game/status`, authorizeUserMiddleWare, RendleContestController.getGameStatus);
router.post(`${rendlesPrefix}/game/word/validate`, authorizeUserMiddleWare, RendleContestController.validateAndUpdateCurrentGuesses);

export { router as rendleRoutes }