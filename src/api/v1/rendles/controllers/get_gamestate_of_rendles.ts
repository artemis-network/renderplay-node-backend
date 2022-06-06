import { Request, Response } from 'express';
import { getRendleGameStateGuessessListByUserId } from '../services/rendle_game_state.services'

// @desc get current words from rendle contest
// @route /backend/v1/rendles/words
// @access public
export const getRendleCurrentGuessesController = async (req: Request, res: Response) => {
	const { userId } = req.body
	const rendles = await getRendleGameStateGuessessListByUserId(userId);
	return res.status(200).json(rendles);
}

