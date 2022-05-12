import { Request, Response } from 'express';

import {
	enterIntoRenderScanContest,
	getRenderScanContestants,
	getRenderScanParticipants,
	saveRenderScanContestResult
} from '../../services/renderscan/renderscan.services'


const enterIntoRenderScanContestController = async (req: Request, res: Response) => {
	try {
		const { gameType, contestId, username, confirm } = req.body;
		const response = await enterIntoRenderScanContest(gameType, contestId, username, confirm);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(200).json(e)
	}
}

const saveRenderScanContestResultController = async (req: Request, res: Response) => {
	try {
		const { contestId, username } = req.body;
		const fileurl = req.file?.destination + "/" + req.file?.filename || '';
		const response = await saveRenderScanContestResult(contestId, username, fileurl);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(200).json(e)
	}
}

const getRenderScanContestantsController = async (req: Request, res: Response) => {
	try {
		const { contestId } = req.body;
		const response = await getRenderScanContestants(contestId);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(200).json(e)
	}
}

const getRenderScanParticipantsController = async (req: Request, res: Response) => {
	try {
		const { contestId } = req.body;
		const response = await getRenderScanParticipants(contestId);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(200).json(e)
	}
}

export {
	saveRenderScanContestResultController,
	enterIntoRenderScanContestController,
	getRenderScanContestantsController,
	getRenderScanParticipantsController
}