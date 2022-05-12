import multer from 'multer';
import express, { Request, Response } from 'express';

import { initUser } from '../bootstrap/user_init'
import { initializeRendleGames } from '../bootstrap/rendle_init'
import { initializeRenderScanGames } from '../bootstrap/renderscan_init'

const fileStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './renderscan_images')
	},
	filename: (req, file, cb) => {
		cb(null, new Date(Date.now()).getTime().toString() + file.originalname);
	}
})

const upload = multer({ storage: fileStorageEngine })

const initializeRenderverseApp = async (req: Request, res: Response) => {
	try {
		await initUser()
		await initializeRendleGames()
		const { word } = req.body;
		const image = req.file?.destination + "/" + req.file?.filename || '';
		const refWord = {
			word,
			image
		}
		const response = await initializeRenderScanGames(refWord);
		res.status(200).json(response)
	} catch (e) {
		res.status(200).json(e)
	}
}

const router = express.Router();

router.get("/api/v1/ping", (req: Request, res: Response) => res.send("Welcome to RENDERVERSE BACKEND"))
router.post('/api/v1/renderverse/init', upload.single("image"), initializeRenderverseApp);

export { router as pingRoutes }