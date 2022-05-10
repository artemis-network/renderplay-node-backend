import express from 'express';
import multer from 'multer';

const router = express.Router();

import {
	initializeRenderScanGamesController,
	enterIntoRenderScanContestController,
	getRenderScanContestantsController,
	getRenderScanParticipantsController,
	saveRenderScanContestResultController
} from '../controllers/renderscan/renderscan.controller'



const fileStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './renderscan_images')
	},
	filename: (req, file, cb) => {
		cb(null, new Date(Date.now()).getTime().toString() + file.originalname);
	}
})

const upload = multer({ storage: fileStorageEngine })


router.post('/api/v1/renderscan/init', upload.single("image"), initializeRenderScanGamesController);
router.post('/api/v1/renderscan/enter', enterIntoRenderScanContestController);
router.post('/api/v1/renderscan/save', upload.single("image"), saveRenderScanContestResultController);
router.post('/api/v1/renderscan/contestants', getRenderScanContestantsController);
router.post('/api/v1/renderscan/participants', getRenderScanParticipantsController);

export { router as renderScanRoutes }