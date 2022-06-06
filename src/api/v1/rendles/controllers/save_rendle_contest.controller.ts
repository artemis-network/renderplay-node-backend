import { Request, Response } from 'express';

import { getWordsFromGameState, cleanGameState } from '../services/rendle_game_state.services'
import { saveRendleContestResult } from '../services/rendle.services'

// @desc save current contest
// @route /backend/v1/rendles/save
// @access public
export const saveRendleContestResultController = async (req: Request, res: Response) => {
	const { gameType, contestId, userId, chances, isWon } = req.body;
	const { words, expiresIn }: any = await getWordsFromGameState(userId);

	// calculating the time taken to complete contest in milliseconds 
	const remainingTime = new Date(expiresIn).getTime() - new Date().getTime()
	const totalTime = (1000 * 60 * 10)
	const completedIn = totalTime - remainingTime

	await saveRendleContestResult(gameType, contestId, userId, completedIn, chances, isWon, words)
	await cleanGameState(userId)
	return res.status(200).json({})
}