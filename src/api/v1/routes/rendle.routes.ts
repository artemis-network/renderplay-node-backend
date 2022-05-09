import express from 'express';

const router = express.Router();

import {
	getRendleGameTypesController,
	resetRendlesGameTypesController,
	enterRendlesContestController,
	saveRendleContestResultController,
	getRendleParticipantsController

} from '../controllers/rendle/rendle_game.controller'

router.get('/api/v1/rendles', getRendleGameTypesController);
router.get('/api/v1/rendles/reset', resetRendlesGameTypesController);
router.post('/api/v1/rendles/enter', enterRendlesContestController);
router.post('/api/v1/rendles/save', saveRendleContestResultController);
router.post('/api/v1/rendles/participants', getRendleParticipantsController);

export { router as rendleRoutes }