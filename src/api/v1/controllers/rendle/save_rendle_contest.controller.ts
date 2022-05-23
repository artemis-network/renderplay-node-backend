import { Request, Response } from 'express';

import { getWordsFromGameState, cleanGameState } from '../../services/rendle/rendle_game_state.services'
import { saveRendleContestResult } from '../../services/rendle/rendle.services'

export const saveRendleContestResultController = async (req: Request, res: Response) => {
	try {
		const { gameType, contestId, userId, chances, isWon } = req.body;
		const { words, expiresIn }: any = await getWordsFromGameState(userId);
		const timer = new Date(expiresIn).getTime() - new Date(Date.now()).getTime()
		const completedIn = (1000 * 60 * 10) - timer
		await saveRendleContestResult(gameType, contestId, userId, completedIn, chances, isWon, words)
		await cleanGameState(userId)
		return res.status(200).json({})
	} catch (error) {
		console.log(error)
		return res.status(200).json({ message: error })
	}
}