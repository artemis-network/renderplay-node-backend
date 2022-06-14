import { Request, Response } from 'express';
import { RendleGameStateServices } from '../services/rendle_game_state.services';

export class RendleGameStateController {
	// @desc get current words from rendle contest
	// @route /backend/v1/rendles/words
	// @access public
	static getRendleCurrentGuesses = async (req: Request, res: Response) => {
		const { userId } = req.body
		const rendles = await
			RendleGameStateServices.getRendleGameStateGuessessListByUserId(userId);
		return res.status(200).json(rendles);
	}

	// @desc update new word to rendle contest
	// @route /backend/v1/rendles/words/update
	// @access public
	static updateCurrentGuesses = async (req: Request, res: Response) => {
		const { userId, word } = req.body
		const response = await
			RendleGameStateServices.updateGuessessListInGameStateByUserId(userId, word)
		return res.status(200).json(response)
	}

}

