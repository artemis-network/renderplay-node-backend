import { Request, Response } from 'express'
import { createRenderScanGameType, renderScanResetOneByContesyId } from '../renderscan.init'

// @desc set question for renderscan game
// @route /backend/v1/renderscans/init
// @access private
export const createRenderScanContestQuizQuestionsControllers = async (req: Request, res: Response) => {
	await createRenderScanGameType()
	return res.status(200).json({ message: "ok" })
}

// @desc set question for renderscan game
// @route /backend/v1/renderscans/init-one
// @access private
export const createRenderScanContestQuizQuestionsOneControllers = async (req: Request, res: Response) => {
	const { contestId, gameType, filename } = req.body
	await renderScanResetOneByContesyId(gameType, filename)
	return res.status(200).json({ message: "ok" })
}