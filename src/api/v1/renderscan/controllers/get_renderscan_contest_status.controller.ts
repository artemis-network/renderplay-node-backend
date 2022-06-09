import { Request, Response } from 'express';

import { doesUserFinishedRenderScanGame, doesUserStillPlayingRenderScanContest } from '../services/renderscan.services'

// @desc get status of current renderscan contest
// @route /backend/v1/renderscan/status
// @access public
export const getRenderScanGameStatusController = async (req: Request, res: Response) => {
	const { userId, contestId } = req.body
	console.log(req.body)

	const gameResult = await doesUserFinishedRenderScanGame(userId, contestId)
	if (gameResult) return res.status(200).json({ isSubmitted: true })

	const isPlaying = await doesUserStillPlayingRenderScanContest(contestId, userId);
	if (isPlaying) return res.status(200).json({ isSubmitted: false, })
}

export const getRendleById = async (req: Request, res: Response) => {
	const { userId, contests, contestId } = req.body;
	const contestantsList = [];
	if (userId) {
		for (let i = 0; i < contests.length; i++) {
			const contestant = contestId;
			contestantsList.push(contestant);
		}
		return contestantsList
	}
	return null;

} 