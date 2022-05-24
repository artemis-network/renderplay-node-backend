import express from 'express';

import { resetRendlesGameTypesController } from '../controllers/rendle/rendle_reset.controller'
import { getRendleCurrentGuessesController, updateCurrentGuessesController } from '../controllers/rendle/rendle_game_state.controller'
import { getRendleGameTypesController, getRendleContestantsController, getRendleParticipantsController, } from '../controllers/rendle/rendle.controller'

import { saveRendleContestResultController } from '../controllers/rendle/save_rendle_contest.controller'
import { enterRendlesContestController } from '../controllers/rendle/enter_into_rendle_contest.controller'
import { getRendleGameStatusController } from '../controllers/rendle/get_rendle_contest_status.controller'

import { rendlesPrefix } from '../config'

const router = express.Router();

router.post(`${rendlesPrefix}/reset`, resetRendlesGameTypesController);

router.get(rendlesPrefix, getRendleGameTypesController);

router.post(`${rendlesPrefix}/enter`, enterRendlesContestController);
router.post(`${rendlesPrefix}/status`, getRendleGameStatusController);
router.post(`${rendlesPrefix}/save`, saveRendleContestResultController);

router.post(`${rendlesPrefix}/contestants`, getRendleContestantsController);
router.post(`${rendlesPrefix}/participants`, getRendleParticipantsController);

router.post(`${rendlesPrefix}/words`, getRendleCurrentGuessesController);
router.post(`${rendlesPrefix}/words/update`, updateCurrentGuessesController);

export { router as rendleRoutes }