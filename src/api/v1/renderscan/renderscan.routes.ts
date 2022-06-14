import express from 'express';

const router = express.Router();

import { getRenderScanQuestionController, getRenderScanLobbyStatusController, submitAnwserForQuestion } from './controllers/get_renderscan_quiz_question.controller'
import { getRenderScanGameStatusController } from './controllers/get_renderscan_contest_status.controller'
import { enterIntoRenderScanContestController } from './controllers/enter_into_renderscan_contest.controller'
import { createRenderScanContestQuizQuestionsControllers, createRenderScanContestQuizQuestionsOneControllers, destroyRenderScan } from './controllers/renderscan_init.controller'
import { getRenderScanContestsController } from './controllers/get_renderscan_contest.controller'
import { getRenderScanGameTypesController } from './controllers/get_renderscan_game_types.controller'

import { renderscanPrefix } from '../config'


router.get(`${renderscanPrefix}`, getRenderScanContestsController);
router.get(`${renderscanPrefix}/types`, getRenderScanGameTypesController);

router.post(`${renderscanPrefix}/init`, createRenderScanContestQuizQuestionsControllers)
router.post(`${renderscanPrefix}/destory`, destroyRenderScan)
router.post(`${renderscanPrefix}/reset`, createRenderScanContestQuizQuestionsOneControllers)
router.post(`${renderscanPrefix}/questions`, getRenderScanQuestionController)
router.post(`${renderscanPrefix}/lobby-status`, getRenderScanLobbyStatusController)
router.post(`${renderscanPrefix}/enter`, enterIntoRenderScanContestController);
router.post(`${renderscanPrefix}/save`, submitAnwserForQuestion);
router.post(`${renderscanPrefix}/status`, getRenderScanGameStatusController);


export { router as renderScanRoutes }