import { Request, Response } from 'express';

import { getWordsFromGameState, cleanGameState } from '../services/rendle_game_state.services'
import { saveRendleContestResult, getRendleExpiryTime, getRendleContestant } from '../services/rendle.services'

// @desc save current contest
// @route /backend/v1/rendles/save
// @access public
export const saveRendleContestResultController = async (req: Request, res: Response) => {
	const { gameType, contestId, userId, chances, isWon } = req.body;
	const contestant = await getRendleContestant(userId, contestId)

	console.log(contestant)
	const { words }: any = await getWordsFromGameState(userId);
	const { expiresAt }: any = await getRendleExpiryTime(contestId)

	// calculating the time taken to complete contest in milliseconds 
	const remainingTime = new Date(expiresAt).getTime() - new Date().getTime()
	const totalTime = (1000 * 60 * 10)
	const completedIn = totalTime - remainingTime

	await saveRendleContestResult(gameType, contestId, contestant?._id, completedIn, chances, isWon, words)
	await cleanGameState(userId)
	return res.status(200).json({})
}