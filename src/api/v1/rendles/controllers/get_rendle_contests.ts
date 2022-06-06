import { Request, Response } from 'express';
import { getRendleContests } from '../services/rendle.services'

// @desc get rendle contests
// @route /backend/v1/rendles
// @access public
export const getRendleContestsController = async (req: Request, res: Response) => {
	try {
		const rendles = await getRendleContests();
		return res.status(200).json(rendles);
	} catch (e) {
		return res.status(200).json(e);
	}
}
