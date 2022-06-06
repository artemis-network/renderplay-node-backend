import { Request, Response } from 'express';
import { getRendleGameTypes, getRendleParticipants, getRendleContestants }
	from '../services/rendle.services'

// @desc get rendle contests
// @route /backend/v1/rendles
// @access public
export const getRendleGameTypesController = async (req: Request, res: Response) => {
	const rendles = await getRendleGameTypes();
	return res.status(200).json(rendles);
}

// @desc get rendle participants
// @route /backend/v1/rendles/participants
// @access public
export const getRendleParticipantsController = async (req: Request, res: Response) => {
	const { contestId, } = req.body
	const response = await getRendleParticipants(contestId);
	return res.status(200).json(response)
}

// @desc get rendle contestants 
// @route /backend/v1/rendles/contestants
// @access public
export const getRendleContestantsController = async (req: Request, res: Response) => {
	const { contestId } = req.body
	const response = await getRendleContestants(contestId);
	return res.status(200).json(response)

}