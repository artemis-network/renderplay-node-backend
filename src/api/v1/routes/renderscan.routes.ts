import express from 'express';
import multer from 'multer';

const router = express.Router();

import {
	enterIntoRenderScanContestController,
	getRenderScanContestantsController,
	getRenderScanParticipantsController,
	saveRenderScanContestResultController
} from '../controllers/renderscan/renderscan.controller'


import { renderscanPrefix } from '../config'


const fileStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './renderscan_images')
	},
	filename: (req, file, cb) => {
		cb(null, new Date(Date.now()).getTime().toString() + file.originalname);
	}
})

const upload = multer({ storage: fileStorageEngine })


router.post(`${renderscanPrefix}/enter`, enterIntoRenderScanContestController);
router.post(`${renderscanPrefix}/save`, upload.single("image"), saveRenderScanContestResultController);
router.post(`${renderscanPrefix}/contestants`, getRenderScanContestantsController);
router.post(`${renderscanPrefix}/participants`, getRenderScanParticipantsController);

export { router as renderScanRoutes }