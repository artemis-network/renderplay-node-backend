import { Request, Response } from 'express';

import {
	getRenderscanGameTypeFee, addUserToRenderScanContest, doesUserAlreadyInRenderScanContest,
} from '../services/renderscan.services'

import { createRenderscanGameStateForUser, getFirstQuestionOpensAt } from '../services/renderscan_quiz.services'

import { deductFunds, getBalance } from '../../user/services/wallet.service'

enum RenderScanContestState {
	INSUFFICENT_FUNDS = "[INSUFFICENT_FUNDS]", APPROVED = "[APPROVED]",
	ALREADY_IN_CONTEST = "[ALREADY_IN_CONTEST]", PAID = "[PAID]"
}

// @desc user entering into renderscan contest
// @route /backend/v1/renderscans/enter
// @access public
export const enterIntoRenderScanContestController = async (req: Request, res: Response) => {
	const { userId, contestId, request, walletAddress } = req.body;

	const isInContest = await doesUserAlreadyInRenderScanContest(contestId, userId);
	if (isInContest) {
		return res.status(200).json({
			message: "ok",
			status: RenderScanContestState.ALREADY_IN_CONTEST,
		})
	}

	const gameEntryFee: any = await getRenderscanGameTypeFee(contestId);
	const balance: any = await getBalance(userId);
	if (gameEntryFee > balance) return res.status(200).json({
		message: "insufficent funds", status: RenderScanContestState.INSUFFICENT_FUNDS
	})

	if (request) return res.status(200).json({
		message: "approved", status: RenderScanContestState.APPROVED, approved: true
	})

	await deductFunds(userId, gameEntryFee)
	await addUserToRenderScanContest(contestId, userId, gameEntryFee, walletAddress);
	const firstQuestionOpensAt: any = await getFirstQuestionOpensAt(contestId);
	await createRenderscanGameStateForUser(userId, contestId, firstQuestionOpensAt)
	return res.status(200).json({
		message: "paid", status: RenderScanContestState.PAID,
	});
}