import { Request, Response } from 'express';

import { deductFunds, getBalance } from '../../user/services/wallet.service'
import { createGameStateForUser, getGameStateIdByUserId } from '../services/rendle_game_state.services';
import { doesUserAlreadyInRendleContest, getRendleContestEntryFee, addUserToRendleContest } from '../services/rendle.services';

enum RendleContestState {
	INSUFFICENT_FUNDS = "[INSUFFICENT_FUNDS]", APPROVED = "[APPROVED]",
	ALREADY_IN_CONTEST = "[ALREADY_IN_CONTEST]",
}

// @desc user entering into contest
// @route /backend/v1/rendles/enter
// @access public
export const enterRendlesContestController = async (req: Request, res: Response) => {

	const { contestId, userId, request, walletAddress } = req.body

	const isInContest = await doesUserAlreadyInRendleContest(userId, contestId);

	if (isInContest) {
		const gameStateId = await getGameStateIdByUserId(userId)
		return res.status(200).json({
			message: "ok",
			status: RendleContestState.ALREADY_IN_CONTEST,
			gameStateId: gameStateId?._id
		})
	}

	const gameEntryFee: any = await getRendleContestEntryFee(contestId);
	const balance: any = await getBalance(userId);

	if (gameEntryFee > balance) return res.status(200).json({
		message: "insufficent funds", status: RendleContestState.INSUFFICENT_FUNDS
	})

	if (request) return res.status(200).json({
		message: "approved", status: RendleContestState.APPROVED, approved: true
	})

	await deductFunds(userId, gameEntryFee)
	await addUserToRendleContest(userId, contestId, walletAddress, gameEntryFee);
	const gameState = await createGameStateForUser(userId, contestId)
	return res.status(200).json({
		message: "ok",
		error: false,
		gameStateId: gameState.gameStateId
	});
}