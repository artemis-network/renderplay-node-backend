import { Request, Response } from 'express';
import {
	getRenderScanTypes, getRenderScanContestants, getRenderScanParticipants, saveRenderScanContestResult,
} from '../../services/renderscan/renderscan.services'


// @desc get renderscan contests
// @route /backend/v1/renderscans
// @access public
export const getRenderScanTypesController = async (req: Request, res: Response) => {
	try {
		const response = await getRenderScanTypes();
		return res.status(200).json(response)
	} catch (error) {
		console.log(error)
		return res.status(200).json({ message: error })
	}
}

// @desc get renderscan contestants
// @route /backend/v1/renderscans/contestants
// @access public
export const getRenderScanContestantsController = async (req: Request, res: Response) => {
	try {
		const { contestId } = req.body;
		const response = await getRenderScanContestants(contestId);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(200).json(e)
	}
}

// @desc get renderscan participants
// @route /backend/v1/renderscans/participants
// @access public
export const getRenderScanParticipantsController = async (req: Request, res: Response) => {
	try {
		const { contestId } = req.body;
		const response = await getRenderScanParticipants(contestId);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(200).json(e)
	}
}

// @desc save renderscan contest result
// @route /backend/v1/renderscans/save
// @access public
export const saveRenderScanContestResultController = async (req: Request, res: Response) => {
	try {
		const { contestId, userId, fileUrl } = req.body;
		const response = await saveRenderScanContestResult(contestId, userId, fileUrl);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(200).json(e)
	}
}
