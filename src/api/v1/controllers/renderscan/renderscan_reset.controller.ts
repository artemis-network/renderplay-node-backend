import { Request, Response } from 'express';

import {
	resetRenderScanGames
} from '../../services/renderscan/renderscan_reset.serivices'


// @desc reset all renderscan contests
// @route /backend/v1/renderscan/reset
// @access private
export const resetRenderScanGamesController = async (req: Request, res: Response) => {
	try {
		const { word, image, type } = req.body
		const response = await resetRenderScanGames(word, image, type);
		return res.status(200).json(response)
	} catch (error) {
		console.log(error)
		return res.status(200).json({ message: error })
	}

}

