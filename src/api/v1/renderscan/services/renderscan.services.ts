import { db } from "../../db"

const { RenderScan, RenderScanContest, RenderScanGameType, RenderScanResults, RenderScanContestant, RenderScanContestTypeState } = db

export const getRenderScanContestants = async () => {
	const renderScanTypes = await RenderScanContest.find().populate("contestants").exec();
	return { renderScanTypes: renderScanTypes }
}

export const doesUserAlreadyInRenderScanContest = async (contestId: string, userId: string) => {
	const contest: any = await RenderScanContest.findById(contestId).populate("contestants")
	const contestants = contest?.contestants;
	for (let i = 0; i < contestants.length; i++)
		if (String(contestants[i].user) === String(userId)) return true
	return false
}

export const createRenderscanContestant = async (userId: string, contestId: string, walletAddress: string) => {
	return await RenderScanContestant.create({
		user: userId,
		contest: contestId,
		walletAddress: walletAddress
	})
}

export const addUserToRenderScanContest = async (contestId: string, userId: string, gameEntryFee: number, walletAddress: string) => {
	const contestant = await createRenderscanContestant(userId, contestId, walletAddress)
	const contest: any = await RenderScanContest.findById(contestId)
	await contest?.updateOne({
		$set: {
			contestants: [...contest.contestants, contestant?._id],
			prizePool: (contest?.prizePool || 0) + (gameEntryFee || 0)
		}
	})
	await contest?.save()
}

export const getRenderscanGameTypeFee = async (contestId: string) => {
	const contest: any = await RenderScanContest.findById(contestId);
	return contest?.entryFee
}

export const saveRenderScanContestResult = async (contestId: string, userId: string, fileUrl: string,) => {
	const scan = await RenderScan.create({ fileUrl: fileUrl, scan: "test", user: userId });
	await RenderScanResults.create({ user: userId, scan: scan, contest: contestId })
}

export const doesUserFinishedRenderScanGame = async (userId: string, contestId: string) => {
	const contestant = await RenderScanContestant.findOne({ user: userId }).where({ contest: contestId })
	const result = await RenderScanResults.findById(contestant?._id)
	if (result !== null) return true
	return false
}

export const doesUserStillPlayingRenderScanContest = async (contestId: string, userId: string) => {
	const contestant = await RenderScanContestant.findOne({ user: userId }).where({ contest: contestId })
	const contest: any = await RenderScanContest.findById(contestant?.contest)
	const contestants = contest?.contestants;
	for (let i = 0; i < contestants.length; i++)
		if (String(contestants[i].user) === String(userId)) return true
	return false
}

export const getRenderScanTypeState = async () => {
	const state = await RenderScanContestTypeState.findOne()
	return {
		gameTypeCounter: state?.gameTypeCounter,
		categoryTypeCounter: state?.categoryTypeCounter
	}
}

export const updateRenderScanTypeState = async () => {
	const state = await RenderScanContestTypeState.findOne()
	await state?.updateOne({
		gameTypeCounter: (state?.gameTypeCounter + 1),
		categoryTypeCounter: (state?.categoryTypeCounter + 1)
	})
	await state?.save()
}

export const getRenderScanContests = async () => await RenderScanContest.find()
	.sort({ startsOn: -1 })
	.limit(3)
	.populate('gameType').exec()

export const getRenderScanGameTypes = async (gameType: string, categoryType: string) =>
	await RenderScanGameType.findOne({ gameType: gameType }).where({ category: categoryType })


export const getRenderScanContestIsLobbyClosed = async (startsOn: Date) => {
	const lobbyCloses = new Date(new Date(startsOn).getTime() + (1000 * 60 * 1)).getTime();
	const now = new Date().getTime()
	const status = now - lobbyCloses
	if (status <= 0) return false
	return true
}