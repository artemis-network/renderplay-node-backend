import { Request, Response } from 'express'
import { RenderScanContest } from '../models/renderscan_contests.model'

// @desc getting renderscans
// @api /backend/v1/renderscan
// @access public
export const getRenderScanContestsController = async (req: Request, res: Response) => {
	console.log(">> logging renderscans")
	const renderscans = await RenderScanContest.find().populate('gameType').exec()
	console.log(renderscans)
	return res.status(200).json({ renderscanContest: renderscans })
}