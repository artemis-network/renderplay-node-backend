import express from 'express';

import { rendlesInit, destoryRendle } from './controllers/rendle_init.controller'
import { resetRendleContests } from './controllers/rendle_reset_contests.controller'

import { RendleGameStateController } from './controllers/rendle_game_state.controller'
import { RendleContestController } from './controllers/rendle_contest.controller'


import { rendlesPrefix } from '../config'

const router = express.Router();

router.post(`${rendlesPrefix}/init`, rendlesInit);
router.post(`${rendlesPrefix}/destroy`, destoryRendle);

router.post(`${rendlesPrefix}/reset`, resetRendleContests);

router.get(rendlesPrefix, RendleContestController.getContests);

router.post(`${rendlesPrefix}/enter`, RendleContestController.enterContest);
router.post(`${rendlesPrefix}/status`, RendleContestController.getGameStatus);
router.post(`${rendlesPrefix}/save`, RendleContestController.saveContestResult);


router.post(`${rendlesPrefix}/words`, RendleGameStateController.getRendleCurrentGuesses);
router.post(`${rendlesPrefix}/words/update`, RendleGameStateController.updateCurrentGuesses);

export { router as rendleRoutes }