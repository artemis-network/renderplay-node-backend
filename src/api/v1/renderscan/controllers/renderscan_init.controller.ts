import { Request, Response } from 'express'
import { createRenderScanGameType, renderScanResetOneByContesyId, dropRenderscan } from '../renderscan.init'

// @desc set question for renderscan game
// @route /backend/v1/renderscans/init
// @access private
export const createRenderScanContests = async (req: Request, res: Response) => {
	await createRenderScanGameType()
	return res.status(200).json({ message: "ok" })
}

// @desc set question for renderscan game
// @route /backend/v1/renderscans/init-one
// @access private
export const createRenderScanContest = async (req: Request, res: Response) => {
	await renderScanResetOneByContesyId()
	return res.status(200).json({ message: "ok" })
}


export const destroyRenderScan = async (req: Request, res: Response) => {
	await dropRenderscan()
	return res.status(200).json({ message: "ok" })
}