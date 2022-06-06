import { Request, Response } from 'express';

import { getWordsFromGameState } from '../services/rendle_game_state.services';
import { doesUserPlayingRendleContest, doesUserFinishedRendleGame } from '../services/rendle.services';

// @desc get status of current contest
// @route /backend/v1/rendles/status
// @access public
export const getRendleGameStatusController = async (req: Request, res: Response) => {
	const { userId, contestId } = req.body

	const gameResult = await doesUserFinishedRendleGame(userId, contestId)
	if (gameResult) return res.status(200).json(gameResult)

	const isPlaying = await doesUserPlayingRendleContest(userId, contestId);
	if (isPlaying) {
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