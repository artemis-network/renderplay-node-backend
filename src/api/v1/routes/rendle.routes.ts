import express from 'express';
const router = express.Router();

const prefix = '/backend/v1/rendles';

import {
	getRendleGameTypesController,
	getRendleGameStatusController,
	enterRendlesContestController,
	getRendleContestantsController,
	getRendleParticipantsController,
	resetRendlesGameTypesController,
	saveRendleContestResultController,
} from '../controllers/rendle/rendle_game.controller'

import {
	getRendleCurrentGuessesController,
	updateCurrentGuessesController
} from '../controllers/rendle/rendle_game_state.controller'

router.get(`${prefix}/reset`, resetRendlesGameTypesController);

router.get(prefix, getRendleGameTypesController);

router.post(`${prefix}/enter`, enterRendlesContestController);
router.post(`${prefix}/status`, getRendleGameStatusController);
router.post(`${prefix}/save`, saveRendleContestResultController);

router.post(`${prefix}/contestants`, getRendleContestantsController);
router.post(`${prefix}/participants`, getRendleParticipantsController);

router.post(`${prefix}/words`, getRendleCurrentGuessesController);
router.post(`${prefix}/words/update`, updateCurrentGuessesController);

export { router as rendleRoutes }