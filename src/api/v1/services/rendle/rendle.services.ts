import mongoose from 'mongoose'

import { db } from '../../models/db'
import { logger } from '../../utils/logger';
import { ErrorHandler } from '../../handlers/error/error.handler'

const { RendleGameType, RendleContest, RendleResult, RendleGameState, RendleWord } = db;

const deleteWords = async (wordsList: any[]) => {
	try {
		for (let i = 0; i < wordsList.length; i++)
			await RendleWord.findByIdAndRemove(wordsList[i]._id)

	} catch (e) {
	}
}

const getRendleGameTypes = async () => {
	try {
		const rendles = await RendleGameType.find().sort({ gameType: 1 });
		return { rendleGameTypes: rendles }
	} catch (e) {
	}
}


const doesUserAlreadyInContest = async (userId: string, contestId: string) => {
	try {
		const contest = await RendleContest.findById(contestId)
		if (!contest) return ErrorHandler
		const contestants = contest?.contestants;
		const contestant = contestants?.find((contestant) => String(contestant) === String(userId))
		if (contestant) return true
		return false
	} catch (error) {
	}
}


const getEntryFee = async (gameType: number) => {
	try {
		const rendleGameType = await RendleGameType.findOne({ gameType: gameType });
		if (!rendleGameType) throw new Error("Object not found")
		return rendleGameType.entryFee
	} catch (error) {
	}
}

const addContestantToContest = async (userId: string, contestId: string, entryFee: number) => {
	try {
		const contest = await RendleContest.findById(contestId);
		const contestants = contest?.contestants;
		contestants?.push(userId);
		await contest?.updateOne({
			$set: {
				contestants: contestants,
				prizePool: (contest?.prizePool + entryFee)
			}
		})
		await contest?.save()
	} catch (error) {

	}
}


const getRendleContestants = async (contestId: string) => {
	try {
		const rendleContestants = await RendleContest.findById(contestId)
		return { contestants: rendleContestants }
	} catch (e) {
	}
}


const saveRendleContestResult = async (
	gameType: number,
	contestId: string,
	userId: string,
	chances: number,
	isWon: boolean
) => {
	try {
		const rendle = await RendleGameType.findOne({ contestId: contestId })
		const contest = mongoose.Types.ObjectId(contestId);
		const rendleContest = await RendleContest.findById(contest);
		const gameState: any = await RendleGameState.findOne({ userId: userId })
		const words = gameState?.words
		await RendleResult.create({
			userId: userId,
			gameType: gameType,
			chances: chances,
			isWon: isWon,
			completedOn: Date.now(),
			startedOn: rendle?.startsOn,
			contestId: rendleContest?._id,
			rendleWords: words
		})
		await deleteWords(words)
		await RendleGameState.findOneAndRemove({ userId: userId })
		return { message: "Successfully Posted" }
	} catch (error) {
	}
}

const getRendleParticipants = async (contestId: string) => {
	try {
		const results = await RendleResult.find()
		const participants: any = [];
		results.map((result) => {
			const _id = String(result?.contestId)
			if (_id === contestId) participants.push(result);
		})
		return { participants: participants };
	} catch (error) {
	}
}


const doesUserFinishedGame = async (userId: string, contestId: string) => {
	const result = await RendleResult.findOne({ userId: userId }).where({ contestId: contestId }).exec()
	if (result !== null) {
		if (result)
			return {
				id: result?._id,
				startsOn: result?.startedOn,
				completedOn: result?.completedOn,
				isWon: result.isWon,
				contestId: result.contestId,
				isFirstGame: false
			}
	} return null
}

const doesUserPlayingContest = async (userId: string, contestId: string) => {
	const contest = await RendleContest.findById(contestId)
	const contestants = contest?.contestants;
	const isParticipating = contestants?.find((c) => String(c) === String(userId))
	if (isParticipating) return true
	return false
}

export {
	addContestantToContest,
	getEntryFee,
	doesUserAlreadyInContest,
	getRendleGameTypes,
	saveRendleContestResult,
	getRendleParticipants,
	getRendleContestants,
	doesUserFinishedGame,
	doesUserPlayingContest
}
