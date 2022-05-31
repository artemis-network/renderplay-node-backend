import multer from 'multer';

import express, { Request, Response } from 'express';

import { initUser } from './bootstrap/user_init'
import { initializeRendleGames } from './bootstrap/rendle_init'
// import { initializeRenderScanGames } from './renderscan/renderscan.init'

import { parentPrefix, renderversePrefix, } from './config'


// const initializeRenderverseApp = async (req: Request, res: Response) => {
// 	try {
// 		await initUser()
// 		await initializeRendleGames()
// 		const { word, image } = req.body;
// 		const refWord = {
// 			word,
// 			image
// 		}
// 		const response = await initializeRenderScanGames(refWord);
// 		res.status(200).json({ message: "OK" })
// 	} catch (e) {
// 		res.status(200).json(e)
// 	}
// }

const router = express.Router();

router.get(`${parentPrefix}/ping`, (req: Request, res: Response) => res.status(200).json({ message: "WELCOME TO RENDERVERSE BACKEND" }))
// router.post(`${renderversePrefix}/init`, initializeRenderverseApp);

export { router as pingRoutes }