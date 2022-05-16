import { Request, Response } from 'express';
import {
	getRendleGameTypes,
	resetRendlesGameTypes,
	enterIntoRendleContest,
	saveRendleContestResult,
	getRendleParticipants,
	getRendleContestants,
	getRendleGameStatus
} from '../../services/rendle/rendle.services'


const getRendleGameTypesController = async (req: Request, res: Response) => {
	try {
		const rendles = await getRendleGameTypes();
		return res.status(200).json(rendles);
	} catch (e) {
		return res.status(200).json(e);
	}
}

const resetRendlesGameTypesController = async (req: Request, res: Response) => {
	try {
		const response = await resetRendlesGameTypes()
		return res.status(200).json(response)
	} catch (error) {
		return res.status(200).json({ message: "Not OK" })
	}
}

const enterRendlesContestController = async (req: Request, res: Response) => {
	try {
		const { gameType, contestId, userId, confirm } = req.body
		const response = await enterIntoRendleContest(gameType, contestId, userId, confirm);
		return res.status(200).json(response)
	} catch (error) {
		return res.status(200).json({ message: "Not OK" })
	}
}

const saveRendleContestResultController = async (req: Request, res: Response) => {
	try {
		const { gameType, contestId, userId, chances, isWon } = req.body;
		console.log(req.body)
		const response = await saveRendleContestResult(gameType, contestId, userId, chances, isWon)
		return res.status(200).json(response)
	} catch (error) {
		return res.status(200).json({ message: error })
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

const getRendleGameStatusController = async (req: Request, res: Response) => {
	try {
		const { userId, contestId, gameType } = req.body
		const response = await getRendleGameStatus(userId, contestId, gameType);
		return res.status(200).json(response)
	} catch (error) {
		return res.status(200).json({ message: error })
	}
}

export {
	getRendleGameTypesController,
	resetRendlesGameTypesController,
	enterRendlesContestController,
	saveRendleContestResultController,
	getRendleParticipantsController,
	getRendleContestantsController,
	getRendleGameStatusController,
}