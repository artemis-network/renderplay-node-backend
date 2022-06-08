import { db, RendleContestantType } from '../../db'

const { RendleContest, RendleResult, RendleContestant } = db;

export const getRendleContests = async () => {
	const rendles: any = await RendleContest.find().where({ isVisible: true }).populate("gameType").sort({ gameType: 1 }).exec();
	const serializedRendles = []
	for (let i = 0; i < rendles.length; i++) {
		const id = rendles[i]._id
		const gameType = rendles[i].gameType?.gameType;
		const startsOn = rendles[i].startsOn;
		const entryFee = rendles[i].entryFee
		const expiresAt = rendles[i].expiresAt
		serializedRendles.push({
			_id: id, gameType: gameType, startsOn: startsOn, entryFee: entryFee, expiresAt: expiresAt
		})
	}
	return { rendleContests: serializedRendles }
}

export const doesUserAlreadyInRendleContest = async (userId: string, contestId: string) => {
	const contest = await RendleContest.findById(contestId).populate("contestants")
	const contestants: any = contest?.contestants ?? [];
	for (let i = 0; i < contestants.length; i++) {
		const isInContest: boolean = String(contestants[i].user) === String(userId);
		if (isInContest) return true
	}
	return false
}

export const getRendleContestEntryFee = async (id: number) => {
	const contest = await RendleContest.findById(id);
	return contest?.entryFee || 0
}

export const createRendleContestant = async (contestant: RendleContestantType) => await RendleContestant.create(contestant)

export const getRendleContestant = async (userId: string, contestId: string) => await RendleContestant.findOne({
	contest: contestId
}).where({ user: userId })

export const addUserToRendleContest = async (userId: string, contestId: string, walletAddress: string, entryFee: number) => {
	const contest = await RendleContest.findById(contestId);
	const contestant = await createRendleContestant({ user: userId, contest: contestId, walletAddress: walletAddress })
	await contest?.updateOne({
		$set: {
			contestants: ([...contest?.contestants, contestant]),
			prizePool: (contest?.prizePool + entryFee)
		}
	})
	await contest?.save()
}

export const saveRendleContestResult = async (gameType: number, contestId: string, contestant: string,
	completedIn: number, chances: number, isWon: boolean, words: any) => {
	try {
		await RendleResult.create({
			contestant: contestant, gameType: gameType, chances: chances, completedIn: completedIn,
			isWon: isWon, completedOn: new Date(), contest: contestId, rendleWords: words
		})
	} catch (e) {
		console.log(e)
	}
}

export const doesUserFinishedRendleGame = async (userId: string, contestId: string) => {
	const contestant = await RendleContestant.findOne({ user: userId }).where({ contest: contestId })
	const result = await RendleResult.findOne({ contestant: contestant?._id })
	if (result !== null) {
		if (result)
			return {
				id: result?._id,
				startsOn: result?.startedOn,
				completedOn: result?.completedOn,
				isWon: result.isWon,
				contest: result.contest,
				isGameCompleted: true
			}
	} return null
}

export const doesUserPlayingRendleContest = async (userId: string, contestId: string) => {
	const contest = await RendleContest.findById(contestId).populate("contestants")
	const contestants: any = contest?.contestants ?? [];
	for (let i = 0; i < contestants.length; i++) {
		console.log(contestants, userId)
		const isPlaying: boolean = String(contestants[i].user) === String(userId);
		if (isPlaying) return true
	}
	return false
}

export const getRendleExpiryTime = async (contestId: string) => {
	const contest = await RendleContest.findById(contestId)
	return { expiresAt: contest?.expiresAt, opensAt: contest?.opensAt }
}