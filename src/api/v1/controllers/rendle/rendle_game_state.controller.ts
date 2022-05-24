import { Request, Response } from 'express';
import {
	updateGuessessListInGameStateByUserId, getRendleGameStateGuessessListByUserId
} from '../../services/rendle/rendle_game_state.services'

// @desc get current words from rendle contest
// @route /backend/v1/rendles/words
// @access public
export const getRendleCurrentGuessesController = async (req: Request, res: Response) => {
	try {
		const { userId } = req.body
		const rendles = await getRendleGameStateGuessessListByUserId(userId);
		return res.status(200).json(rendles);
	} catch (e) {
		return res.status(200).json(e);
	}
}

// @desc update new word to rendle contest
// @route /backend/v1/rendles/words/update
// @access public
export const updateCurrentGuessesController = async (req: Request, res: Response) => {
	try {
		const { userId, word } = req.body
		const response = await updateGuessessListInGameStateByUserId(userId, word)
		return res.status(200).json(response)
	} catch (error) {
		return res.status(200).json({ message: "Not OK" })
	}
}