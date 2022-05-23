import { Request, Response } from 'express';
import {
	getRendleGameTypes,
	saveRendleContestResult,
	getRendleParticipants,
	getRendleContestants,
} from '../../services/rendle/rendle.services'

import { deductFunds, getBalance } from '../../services/user/wallet.service'
import { createGameStateForUser, getGameStateIdByUserId } from '../../services/rendle/rendle_game_state.services';
import { doesUserAlreadyInContest, getEntryFee, addContestantToContest } from '../../services/rendle/rendle.services';
import { doesUserFinishedGame, doesUserPlayingContest } from '../../services/rendle/rendle.services';

const getRendleGameTypesController = async (req: Request, res: Response) => {
	try {
		const rendles = await getRendleGameTypes();
		return res.status(200).json(rendles);
	} catch (e) {
		return res.status(200).json(e);
	}
}

enum ContestState {
	INSUFFICENT_FUNDS = "[INSUFFICENT_FUNDS]",
	APPROVED = "[APPROVED]",
	ALREADY_IN_CONTEST = "[ALREADY_IN_CONTEST]",
}

const enterRendlesContestController = async (req: Request, res: Response) => {
	try {
		const { gameType, contestId, userId, request } = req.body

		// checking is user already in contest
		const isInContest = await doesUserAlreadyInContest(userId, contestId);
		if (isInContest) {
			const gameStateId = await getGameStateIdByUserId(userId)
			return res.status(200).json({ message: "ok", status: ContestState.ALREADY_IN_CONTEST, gameStateId: gameStateId?._id })
		}

		// checking user has sufficient balance  
		const entryFee: any = await getEntryFee(gameType);
		const balance: any = await getBalance(userId);
		if (entryFee > balance) return res.status(200).json({ message: "insufficent funds", status: ContestState.INSUFFICENT_FUNDS })

		if (request)
			return res.status(200).json({ message: "approved", status: ContestState.APPROVED, approved: true })

		// deducting entry fee from user wallet
		await deductFunds(userId, entryFee)
		// enter user in the contest 
		await addContestantToContest(userId, contestId, entryFee);
		// create game state for user
		const gameState = await createGameStateForUser(userId, contestId)
		return res.status(200).json({ message: "ok", error: false, gameStateId: gameState.gameStateId });
	} catch (error) {
		return res.status(200).json({ message: "not okay" })
	}
}

const getRendleGameStatusController = async (req: Request, res: Response) => {
	try {
		const { userId, contestId } = req.body

		// user already finished game 
		const gameResult = await doesUserFinishedGame(userId, contestId)

		// sending game result as response 
		if (gameResult) return res.status(200).json(gameResult)

		// check user still playing contest
		const isPlaying = await doesUserPlayingContest(userId, contestId);
		if (isPlaying) {
			// fetching current game state and sending response
			const gameState = await getGameStateIdByUserId(userId);
			const response = {
				contestId: contestId,
				isGameCompleted: false,
				words: gameState?.words,
				startedOn: gameState?.startedOn
			}
			return res.status(200).json(response)
		}
	} catch (error) {
		return res.status(200).json({ message: error })
	}
}

const saveRendleContestResultController = async (req: Request, res: Response) => {
	try {
		const { gameType, contestId, userId, chances, isWon } = req.body;
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



export {
	getRendleGameTypesController,
	enterRendlesContestController,
	saveRendleContestResultController,
	getRendleParticipantsController,
	getRendleContestantsController,
	getRendleGameStatusController,
}