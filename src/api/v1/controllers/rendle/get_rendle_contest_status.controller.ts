import { Request, Response } from 'express';

import { getWordsFromGameState } from '../../services/rendle/rendle_game_state.services';
import { doesUserFinishedGame, doesUserPlayingContest } from '../../services/rendle/rendle.services';

export const getRendleGameStatusController = async (req: Request, res: Response) => {
	const { userId, contestId } = req.body

	// user already finished game 
	const gameResult = await doesUserFinishedGame(userId, contestId)

	// sending game result as response 
	if (gameResult) return res.status(200).json(gameResult)

	// check user still playing contest
	const isPlaying = await doesUserPlayingContest(userId, contestId);
	if (isPlaying) {
		// fetching current game state and sending response
		const { words, expiresIn }: any = await getWordsFromGameState(userId);
		const wordList = [];
		for (let i = 0; i < words.length; i++) wordList.push(words[i].guess)
		const response = {
			contestId: contestId,
			isGameCompleted: false,
			words: wordList,
			expiresIn: expiresIn
		}
		return res.status(200).json(response)
	}
}