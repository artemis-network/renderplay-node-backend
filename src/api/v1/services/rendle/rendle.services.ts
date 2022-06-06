import { db } from '../../models/db'
import { ErrorHandler } from '../../handlers/error/error.handler'

const { RendleGameType, RendleContest, RendleResult } = db;

// @file rendle_game.controller.ts
// start renderscan game functions 
export const getRendleGameTypes = async () => {
	const rendles = await RendleGameType.find().sort({ gameType: 1 });
	return { rendleGameTypes: rendles }
}

export const getRendleContests = async () => {
	const rendles = await RendleContest.find()
	return { rendleContests: rendles }
}

export const getRendleContestants = async (contestId: string) => {
	const rendleContestants = await RendleContest.findById(contestId)
	return { rendleContestants: rendleContestants }
}

export const getRendleParticipants = async (contestId: string) => {
	const results = await RendleResult.find()
	const participants: any = [];
	results.map((result) => {
		const _id = String(result?.contestId)
		if (_id === contestId) participants.push(result);
	})
	return { rendleParticipants: participants };
}
// @functions end


// @file enter_into_rendle_contest.controller.ts
// @functions start
export const doesUserAlreadyInRendleContest = async (userId: string, contestId: string) => {
	const contest = await RendleContest.findById(contestId)
	if (!contest) return ErrorHandler
	const contestants = contest?.contestants;
	const contestant = contestants?.find((contestant) => String(contestant) === String(userId))
	if (contestant) return true
	return false
}

export const getRendleGameTypeEntryFee = async (gameType: number) => {
	const rendleGameType = await RendleGameType.findOne({ gameType: gameType });
	if (!rendleGameType) throw new Error("Object not found")
	return rendleGameType.entryFee
}

export const addUserToRendleContest = async (userId: string, contestId: string, entryFee: number) => {
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
}
// @functions end

// @file save_rendle_contest.controller.ts
// @functions start
export const saveRendleContestResult = async (gameType: number, contestId: string, userId: string,
	completedIn: number, chances: number, isWon: boolean, words: any) => {
	await RendleResult.create({
		userId: userId, gameType: gameType, chances: chances, completedIn: completedIn,
		isWon: isWon, completedOn: Date.now(), contestId: contestId, rendleWords: words
	})
}
// @functions end 

// @file get_rendle_contest_status.controller.ts
// @functions start
export const doesUserFinishedRendleGame = async (userId: string, contestId: string) => {
	const result = await RendleResult
		.findOne({ userId: userId }).where({ contestId: contestId }).exec()
	if (result !== null) {
		if (result)
			return {
				id: result?._id,
				startsOn: result?.startedOn,
				completedOn: result?.completedOn,
				isWon: result.isWon,
				contestId: result.contestId,
				isGameCompleted: true
			}
	} return null
}

export const doesUserPlayingRendleContest = async (userId: string, contestId: string) => {
	const contest = await RendleContest.findById(contestId)
	const contestants = contest?.contestants;
	const isParticipating = contestants?.find((c) => String(c) === String(userId))
	if (isParticipating) return true
	return false
}
// @functions end 