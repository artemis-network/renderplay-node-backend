import { Request, Response } from "express";
import {
	getRenderScanTypes, getRenderScanContestants, getRenderScanParticipants,
} from "../services/renderscan.services";

import {
	Status400Factory,
} from "../../middlewares/400StatusHandler.middleware";

export interface ContestIdDTO {
	contestId: string;
}

export class RenderScanUserController {
	sanitizeInput = async (input: ContestIdDTO) => {
		if (!input.contestId)
			return Status400Factory.badRequest("contest id is required");
	};

	// @desc get renderscan contests
	// @route /backend/v1/renderscans
	// @access public
	getRenderScanTypesController = async (req: Request, res: Response) => {
		const response = await getRenderScanTypes();
		return res.status(200).json(response);
	};

	// @desc get renderscan contestants
	// @route /backend/v1/renderscans/contestants
	// @access public
	getRenderScanContestantsController = async (req: Request, res: Response) => {
		const { contestId } = req.body as ContestIdDTO;
		const response = await getRenderScanContestants(contestId);
		return res.status(200).json(response);
	};

	// @desc get renderscan participants
	// @route /backend/v1/renderscans/participants
	// @access public
	getRenderScanParticipantsController = async (req: Request, res: Response) => {
		const { contestId } = req.body as ContestIdDTO;
		const response = await getRenderScanParticipants(contestId);
		return res.status(200).json(response);
	};
}
