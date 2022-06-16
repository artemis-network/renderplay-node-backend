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
	static validateCurrentGuesses = async (req: Request, res: Response) => {
		const { userId, contestId, word } = req.body
		const answer = await RendleGameStateServices.getAnswerForTheContest(contestId);
		// const response = await
		// 	RendleGameStateServices.validateGuessesFromWordsList(word, gameType)
		return res.status(200).json(null)
	}

	static getGameTypeFromContestId = async (req: Request, res: Response) => {
		const { contestId } = req.params
		const gameType = await RendleGameStateServices.getGameTypeFromContest(contestId);
		const response =  { gameType: gameType }
		return res.status(200).json(response)
	}

}

