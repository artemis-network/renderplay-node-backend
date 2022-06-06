import { Request, Response } from 'express'
import {
	getRenderScanQuizByContestId, getRenderScanCurrentLiveQuestion,
} from '../services/renderscan_quiz.services'

// @desc get question for renderscan game
// @route /backend/v1/renderscans/questions
// @access public
export const getRenderScanQuestionController = async (req: Request, res: Response) => {
	const { contestId } = req.body
	const quiz: any = await getRenderScanQuizByContestId(contestId)
	const question: any = getRenderScanCurrentLiveQuestion(quiz.questions)
	if (question === null) return res.status(200).json({ lobbyTime: quiz.lobbyTime, isGameStarted: false })
	// adding 1 minute expiration time for question
	const expiresAt: Date = new Date(new Date(question.opensAt).getTime() + (1000 * 60))
	return res.status(200).json({
		lobbyTime: quiz.lobbyTime, question: question.question, opensAt: question.opensAt,
		expiresAt: expiresAt, isGameStarted: true
	})
}
