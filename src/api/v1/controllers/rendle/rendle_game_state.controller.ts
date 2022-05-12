import { Request, Response } from 'express';
import {
	getRendleCurrentGuesses, updateCurrentGuesses
} from '../../services/rendle/rendle_game_state.services'


const getRendleCurrentGuessesController = async (req: Request, res: Response) => {
	try {
		const { userId } = req.body
		const rendles = await getRendleCurrentGuesses(userId);
		return res.status(200).json(rendles);
	} catch (e) {
		return res.status(200).json(e);
	}
}

const updateCurrentGuessesController = async (req: Request, res: Response) => {
	try {
		const { userId, contestId, word, gameStateId } = req.body
		const response = await updateCurrentGuesses(userId, contestId, word, gameStateId)
		return res.status(200).json(response)
	} catch (error) {
		return res.status(200).json({ message: "Not OK" })
	}
}


export {
	getRendleCurrentGuessesController,
	updateCurrentGuessesController
}