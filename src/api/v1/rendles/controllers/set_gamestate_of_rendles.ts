import { Request, Response } from 'express';
import { updateGuessessListInGameStateByUserId } from '../services/rendle_game_state.services'

// @desc update new word to rendle contest
// @route /backend/v1/rendles/words/update
// @access public
export const updateCurrentGuessesController = async (req: Request, res: Response) => {
	const { userId, word } = req.body
	const response = await updateGuessessListInGameStateByUserId(userId, word)
	return res.status(200).json(response)
}