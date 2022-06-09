import { Request, Response } from 'express';
import { saveRenderScanContestResult, } from '../services/renderscan.services'

// @desc save renderscan contest result
// @route /backend/v1/renderscans/save
// @access public
export const saveRenderScanContestResultController = async (req: Request, res: Response) => {
	const { contestId, userId, fileUrl } = req.body;
	const response = await saveRenderScanContestResult(contestId, userId, fileUrl);
	return res.status(200).json(response);
}