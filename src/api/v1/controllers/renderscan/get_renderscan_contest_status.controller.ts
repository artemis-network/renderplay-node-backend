import { Request, Response } from 'express';

import { doesUserFinishedRenderScanGame, doesUserStillPlayingRenderScanContest } from '../../services/renderscan/renderscan.services'

// @desc get status of current renderscan contest
// @route /backend/v1/renderscan/status
// @access public
export const getRenderScanGameStatusController = async (req: Request, res: Response) => {
	const { userId, contestId } = req.body

	const gameResult = await doesUserFinishedRenderScanGame(userId, contestId)
	if (gameResult) return res.status(200).json({ isSubmitted: true })

	const isPlaying = await doesUserStillPlayingRenderScanContest(userId, contestId);
	if (isPlaying) return res.status(200).json({ isSubmitted: false })
}