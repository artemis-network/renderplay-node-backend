import { Request, Response } from 'express';

import { deductFunds, getBalance } from '../../services/user/wallet.service'
import { createGameStateForUser, getGameStateIdByUserId } from '../../services/rendle/rendle_game_state.services';
import { doesUserAlreadyInContest, getEntryFee, addContestantToContest } from '../../services/rendle/rendle.services';

enum ContestState {
	INSUFFICENT_FUNDS = "[INSUFFICENT_FUNDS]",
	APPROVED = "[APPROVED]",
	ALREADY_IN_CONTEST = "[ALREADY_IN_CONTEST]",
}

export const enterRendlesContestController = async (req: Request, res: Response) => {
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