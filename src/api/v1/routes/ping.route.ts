import multer from 'multer';

import express, { Request, Response } from 'express';

import { initUser } from '../bootstrap/user_init'
import { initializeRendleGames } from '../bootstrap/rendle_init'
import { initializeRenderScanGames } from '../bootstrap/renderscan_init'

import { AZURE_BLOB_CREDS } from '../../../config'

const multerAzure = require('multer-azure')

const upload = multer({
	storage: multerAzure({
		key: AZURE_BLOB_CREDS.key,
		account: AZURE_BLOB_CREDS.account,
		container: AZURE_BLOB_CREDS.container,
		connectionString: AZURE_BLOB_CREDS.connectionString,
		createContainerIfNotExists: false,
		blobPathResolver: function (req: any, file: any, callback: any) {
			callback(null, new Date(Date.now()).getTime().toString() + file.originalname);
		},
	})
})

const initializeRenderverseApp = async (req: Request, res: Response) => {
	try {
		// console.log(filename)
		await initUser()
		await initializeRendleGames()
		const { word } = req.body;
		const image = `/${req.file?.destination}/${req.file?.filename}` || '';
		const refWord = {
			word,
			image
		}
		const response = await initializeRenderScanGames(refWord);
		res.status(200).json({ message: "OK" })
	} catch (e) {
		res.status(200).json(e)
	}
}

const router = express.Router();

router.get("/", (req: Request, res: Response) => res.status(200).json({ message: "WELCOME TO RENDERVERSE BACKEND" }))
router.post('/api/v1/renderverse/init', upload.single('image'), initializeRenderverseApp);

export { router as pingRoutes }