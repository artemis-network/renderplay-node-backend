import express from 'express';

const router = express.Router();

import {
	getRendleGameTypesController,
	resetRendlesGameTypesController,
	enterRendlesContestController,
	saveRendleContestResultController,
	getRendleParticipantsController,
	getRendleContestantsController,
	getRendleGameStatusController
} from '../controllers/rendle/rendle_game.controller'

router.get('/api/v1/rendles', getRendleGameTypesController);
router.get('/api/v1/rendles/reset', resetRendlesGameTypesController);
router.post('/api/v1/rendles/enter', enterRendlesContestController);
router.post('/api/v1/rendles/save', saveRendleContestResultController);
router.post('/api/v1/rendles/participants', getRendleParticipantsController);
router.post('/api/v1/rendles/contestants', getRendleContestantsController);
router.post('/api/v1/rendles/status', getRendleGameStatusController);

export { router as rendleRoutes }