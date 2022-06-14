import { Request, Response } from 'express';

import { RendleContestServices } from '../services/rendle_contest.services'
import { RendleGameStateServices } from '../services/rendle_game_state.services'
import { deductFunds, getBalance } from '../../user/services/wallet.service'

enum RendleContestState {
	INSUFFICENT_FUNDS = "[INSUFFICENT_FUNDS]", APPROVED = "[APPROVED]",
	ALREADY_IN_CONTEST = "[ALREADY_IN_CONTEST]",
}

export class RendleContestController {

	// @desc user entering into contest
	// @route /backend/v1/rendles/enter
	// @access public
	static enterContest = async (req: Request, res: Response) => {

		const { contestId, userId, request, walletAddress } = req.body

		const isInContest = await RendleContestServices.doesUserAlreadyInContest(userId, contestId);

		const isLobbyClosed = await RendleContestServices.isLobbyClosed(contestId)

		if (isInContest) {
			const gameStateId = await RendleGameStateServices.getGameStateIdByUserId(userId)
			return res.status(200).json({
				message: "ok",
				status: RendleContestState.ALREADY_IN_CONTEST,
				gameStateId: gameStateId?._id
			})
		}
		if (isLobbyClosed) return res.status(200).json({
			isLobbyClosed: isLobbyClosed
		})

		const gameEntryFee: any = await RendleContestServices.getContestEntryFee(contestId);
		const balance: any = await getBalance(userId);

		if (gameEntryFee > balance) return res.status(200).json({
			message: "insufficent funds", status: RendleContestState.INSUFFICENT_FUNDS
		})

		if (request) return res.status(200).json({
			message: "approved", status: RendleContestState.APPROVED, approved: true
		})

		await deductFunds(userId, gameEntryFee)
		await RendleContestServices.addUserToContest(userId, contestId, walletAddress, gameEntryFee);
		const gameState = await RendleGameStateServices.createGameStateForUser(userId, contestId)
		return res.status(200).json({
			message: "ok",
			error: false,
			gameStateId: gameState.gameStateId
		});
	}


	// @desc save current contest
	// @route /backend/v1/rendles/save
	// @access public
	static saveContestResult = async (req: Request, res: Response) => {
		const { gameType, contestId, userId, chances, isWon } = req.body;
		const contestant = await RendleContestServices.getContestant(userId, contestId)

		const { words }: any = await RendleGameStateServices.getWordsFromGameState(userId);
		const { expiresAt }: any = await RendleContestServices.getExpiryTime(contestId)

		// calculating the time taken to complete contest in milliseconds 
		const remainingTime = new Date(expiresAt).getTime() - new Date().getTime()
		const totalTime = (1000 * 60 * 10)
		const completedIn = totalTime - remainingTime

		await RendleContestServices.saveContestResult(gameType, contestId, contestant?._id, completedIn, chances, isWon, words)
		await RendleGameStateServices.cleanGameState(userId)
		return res.status(200).json({})
	}

	// @desc get rendle contests
	// @route /backend/v1/rendles
	// @access public
	static getContests = async (req: Request, res: Response) => {
		try {
			const rendles = await RendleContestServices.getContests();
			return res.status(200).json(rendles);
		} catch (e) {
			return res.status(200).json(e);
		}
	}

	// @desc get status of current contest
	// @route /backend/v1/rendles/status
	// @access public
	static getGameStatus = async (req: Request, res: Response) => {
		const { userId, contestId } = req.body

		const gameResult = await RendleContestServices.doesUserFinishedGame(userId, contestId)
		if (gameResult) return res.status(200).json(gameResult)

		const isPlaying = await RendleContestServices.doesUserPlayingContest(userId, contestId);

		if (isPlaying) {
			const { words }: any = await RendleGameStateServices.getWordsFromGameState(userId);
			const { opensAt, expiresAt }: any = await RendleContestServices.getExpiryTime(contestId)
			const wordList = [];
			for (let i = 0; i < words.length; i++) wordList.push(words[i].guess)
			const response = {
				contestId: contestId, isGameCompleted: false, words: wordList,
				expiresAt: expiresAt, opensAt: opensAt,
			}
			return res.status(200).json(response)
		}
	}

}