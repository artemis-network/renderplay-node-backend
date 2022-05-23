import { Request, Response } from 'express';
import {
	getRendleGameTypes,
	getRendleParticipants,
	getRendleContestants,
} from '../../services/rendle/rendle.services'


const getRendleGameTypesController = async (req: Request, res: Response) => {
	try {
		const rendles = await getRendleGameTypes();
		return res.status(200).json(rendles);
	} catch (e) {
		return res.status(200).json(e);
	}
}


const getRendleParticipantsController = async (req: Request, res: Response) => {
	try {
		const { contestId, } = req.body
		const response = await getRendleParticipants(contestId);
		return res.status(200).json(response)
	} catch (error) {
		return res.status(200).json({ message: error })
	}
}

const getRendleContestantsController = async (req: Request, res: Response) => {
	try {
		const { contestId } = req.body
		const response = await getRendleContestants(contestId);
		return res.status(200).json(response)
	} catch (error) {
		return res.status(200).json({ message: error })
	}
}



export {
	getRendleGameTypesController,
	getRendleParticipantsController,
	getRendleContestantsController,
}