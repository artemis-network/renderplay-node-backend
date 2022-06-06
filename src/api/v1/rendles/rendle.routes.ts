import express from 'express';

import { resetRendlesGameTypesController } from './controllers/reset_rendle_contests.controller'
import { getRendleCurrentGuessesController } from './controllers/get_gamestate_of_rendles'
import { updateCurrentGuessesController } from './controllers/set_gamestate_of_rendles'

import { getRendleContestsController } from './controllers/get_rendle_contests'

import { saveRendleContestResultController } from './controllers/save_rendle_contest.controller'
import { enterRendlesContestController } from './controllers/enter_into_rendle_contest.controller'
import { getRendleGameStatusController } from './controllers/get_rendle_contest_status.controller'
import { rendlesInit } from './controllers/init_rendles.controller'

import { rendlesPrefix } from '../config'

const router = express.Router();

router.post(`${rendlesPrefix}/init`, rendlesInit);
router.post(`${rendlesPrefix}/reset`, resetRendlesGameTypesController);

router.get(rendlesPrefix, getRendleContestsController);

router.post(`${rendlesPrefix}/enter`, enterRendlesContestController);
router.post(`${rendlesPrefix}/status`, getRendleGameStatusController);
router.post(`${rendlesPrefix}/save`, saveRendleContestResultController);


router.post(`${rendlesPrefix}/words`, getRendleCurrentGuessesController);
router.post(`${rendlesPrefix}/words/update`, updateCurrentGuessesController);

export { router as rendleRoutes }