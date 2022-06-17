import express from 'express';

import { rendlesInit, destoryRendle } from './controllers/rendle_init.controller'
import { RendleResetController } from './controllers/rendle_reset_contests.controller'

import { RendleGameStateController } from './controllers/rendle_game_state.controller'
import { RendleContestController } from './controllers/rendle_contest.controller'

import { adminAuthenticatorMiddleWare } from '../middlewares/adminAuthenticator.middleware'

import { rendlesPrefix } from '../config'

const router = express.Router();

router.post(`${rendlesPrefix}/init`, adminAuthenticatorMiddleWare, rendlesInit);
router.post(`${rendlesPrefix}/destroy`, adminAuthenticatorMiddleWare, destoryRendle);
router.post(`${rendlesPrefix}/reset`, adminAuthenticatorMiddleWare, RendleResetController.resetContests);

router.get(rendlesPrefix, RendleContestController.getContests);

router.post(`${rendlesPrefix}/enter`, RendleContestController.enterContest);
router.post(`${rendlesPrefix}/save`, RendleContestController.saveContestResult);
router.post(`${rendlesPrefix}/game/status`, RendleContestController.getGameStatus);
router.post(`${rendlesPrefix}/game/word/validate`, RendleContestController.validateAndUpdateCurrentGuesses);

export { router as rendleRoutes }