import { Request, Response } from 'express'
import { RenderScanContest } from '../models/renderscan_contest.model'

// @desc getting renderscans
// @api /backend/v1/renderscan
// @access public
export const getRenderScanContestsController = async (req: Request, res: Response) => {
	const renderscans: any = await RenderScanContest.find().populate('gameType').exec()
	console.log(renderscans)
	const modRenderscanList = [];
	for (let i = 0; i < renderscans.length; i++) {
		const response = {
			_id: renderscans[i]._id,
			startsOn: renderscans[i].startsOn,
			entryFee: renderscans[i].entryFee,
			gameType: renderscans[i].gameType.gameType,
			category: renderscans[i].gameType.category,
		}
		modRenderscanList.push(response)
	}
	return res.status(200).json({ renderscanContests: modRenderscanList })
}