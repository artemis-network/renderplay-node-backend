import express from 'express';
import multer from 'multer';

const router = express.Router();

import { RenderScanUserController } from './controllers/get_renderscan_users.controller'

import { getRenderScanQuestionController, } from './controllers/get_renderscan_quiz_question.controller'
import { getRenderScanGameStatusController } from './controllers/get_renderscan_contest_status.controller'
import { enterIntoRenderScanContestController } from './controllers/enter_into_renderscan_contest.controller'
import { saveRenderScanContestResultController } from './controllers/save_renderscan_contest.controller'
import { createRenderScanContestQuizQuestionsControllers, createRenderScanContestQuizQuestionsOneControllers } from './controllers/renderscan_init.controller'
import { getRenderScanContestsController } from './controllers/get_renderscan_contest.controller'
import { getRenderScanGameTypesController } from './controllers/get_renderscan_game_types.controller'

import { renderscanPrefix } from '../config'

const fileStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => cb(null, './renderscan_images'),
	filename: (req, file, cb) => cb(null, new Date().getTime().toString() + file.originalname)
})

const upload = multer({ storage: fileStorageEngine })

const renderScanController = new RenderScanUserController()

router.get(`${renderscanPrefix}`, getRenderScanContestsController);
router.get(`${renderscanPrefix}/types`, getRenderScanGameTypesController);

router.post(`${renderscanPrefix}/init`, createRenderScanContestQuizQuestionsControllers)
router.post(`${renderscanPrefix}/reset`, createRenderScanContestQuizQuestionsOneControllers)
router.post(`${renderscanPrefix}/questions`, getRenderScanQuestionController)
router.post(`${renderscanPrefix}/enter`, enterIntoRenderScanContestController);
router.post(`${renderscanPrefix}/save`, upload.single("image"), saveRenderScanContestResultController);
router.post(`${renderscanPrefix}/status`, getRenderScanGameStatusController);


export { router as renderScanRoutes }