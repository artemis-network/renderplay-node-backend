import { Request, Response } from 'express'
import {
	getRenderScanQuizByContestId, doesGameCompleted, getGameStateForUser, updateRenderscanGameState
} from '../services/renderscan_quiz.services'

import { saveRenderScanContestResult, } from '../services/renderscan.services'

// @desc get question for renderscan game
// @route /backend/v1/renderscans/questions
// @access public
export const getRenderScanQuestionController = async (req: Request, res: Response) => {
	const { contestId, userId } = req.body

	const quiz: any = await getRenderScanQuizByContestId(contestId)

	const gameState: any = await getGameStateForUser(contestId, userId)
	if (gameState?.currentQuestionIndex > 5) return res.status(200).json({ isGameEnded: true })

	const questionsList = quiz.questions[gameState?.currentQuestionIndex]

	return res.status(200).json({
		lobbyTime: quiz.lobbyTime, question: questionsList.question, opensAt: gameState?.currentQuestionStartsAt,
		expiresAt: gameState?.currentQuestionExpiresAt, isGameStarted: true
	})
}


// @desc get question for renderscan game
// @route /backend/v1/renderscans/lobby-status
// @access public
export const getRenderScanLobbyStatusController = async (req: Request, res: Response) => {
	const { contestId } = req.body

	const quiz: any = await getRenderScanQuizByContestId(contestId)
	const isGameEnded = await doesGameCompleted(contestId);

	return res.status(200).json({
		lobbyExpiresAt: quiz.lobbyExpiresAt,
		isGameStarted: false,
		isGameEnded: isGameEnded
	})
}

// @desc get question for renderscan game
// @route /backend/v1/renderscans/submit-anwser
// @access public
export const submitAnwserForQuestion = async (req: Request, res: Response) => {
	const { contestId, userId, fileUrl } = req.body;
	const response = await saveRenderScanContestResult(contestId, userId, fileUrl);
	await updateRenderscanGameState(contestId, userId)
	return res.status(200).json(response);
}