import { Request, Response } from 'express';

import {
	getRenderScanTypes,
	getRenderScanGameStatus,
	getRenderScanContestants,
	getRenderScanParticipants,
	enterIntoRenderScanContest,
	saveRenderScanContestResult,
} from '../../services/renderscan/renderscan.services'


const enterIntoRenderScanContestController = async (req: Request, res: Response) => {
	try {
		const { contestId, userId, confirm } = req.body;
		const response = await enterIntoRenderScanContest(contestId, userId, confirm);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(200).json(e)
	}
}

const saveRenderScanContestResultController = async (req: Request, res: Response) => {
	try {
		const { contestId, userId, fileUrl } = req.body;
		const response = await saveRenderScanContestResult(contestId, userId, fileUrl);
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

const getRenderScanGameStatusController = async (req: Request, res: Response) => {
	try {
		const { userId, contestId } = req.body
		const response = await getRenderScanGameStatus(userId, contestId);
		return res.status(200).json(response)
	} catch (error) {
		return res.status(200).json({ message: error })
	}
}


const getRenderScanTypesController = async (req: Request, res: Response) => {
	try {
		const response = await getRenderScanTypes();
		return res.status(200).json(response)
	} catch (error) {
		console.log(error)
		return res.status(200).json({ message: error })
	}

}

export {
	getRenderScanTypesController,
	getRenderScanGameStatusController,
	getRenderScanContestantsController,
	getRenderScanParticipantsController,
	enterIntoRenderScanContestController,
	saveRenderScanContestResultController,
}