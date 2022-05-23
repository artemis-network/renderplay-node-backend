import express from 'express';

import {
	getRendleGameTypesController,
	getRendleGameStatusController,
	enterRendlesContestController,
	getRendleContestantsController,
	getRendleParticipantsController,
	saveRendleContestResultController,
} from '../controllers/rendle/rendle_game.controller'

import {
	resetRendlesGameTypesController
} from '../controllers/rendle/rendle_init.controller'

import {
	getRendleCurrentGuessesController,
	updateCurrentGuessesController
} from '../controllers/rendle/rendle_game_state.controller'

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