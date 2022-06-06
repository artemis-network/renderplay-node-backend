import { renderScanDomainObjects } from "../renderscan.objects"

const { RenderScan, RenderScanContest, RenderScanGameType, RenderScanResults } = renderScanDomainObjects

export const getRenderScanTypes = async () => {
	const renderScanTypes = await RenderScanGameType.find();
	return { renderScanTypes: renderScanTypes }
}

export const getRenderScanContestants = async (contestId: string) => {
	const renderScanContestants = await RenderScanContest.findById(contestId)
	return { renderScanContestants: renderScanContestants }
}

export const getRenderScanParticipants = async (contestId: string) => {
	const results = await RenderScanResults.find()
	const participants: any = [];
	results.map((result: any) => {
		const _id = String(result?.contestId)
		if (_id === contestId) participants.push(result);
	})
	return { renderScanParticipants: participants };
}

export const doesUserAlreadyInRenderScanContest = async (contestId: string, userId: string) => {
	const contest = await RenderScanContest.findById(contestId)
	const contestants = contest?.contestants;
	const contestant = contestants?.find((contestant) => String(contestant) === String(userId))
	if (contestant) return true
	return false
}

export const addUserToRenderScanContest = async (contestId: string, userId: string, gameEntryFee: number) => {
	const contest: any = await RenderScanContest.findById(contestId)
	const contestants = contest?.contestants;
	const pool = (contest?.prizePool || 0) + (gameEntryFee || 0);
	contestants?.push(userId);
	await contest?.updateOne({
		$set: {
			contestants: contestants,
			prizePool: pool
		}
	})
	await contest?.save()
}

export const getRenderscanGameTypeFee = async (contestId: string) => {
	const renderScanGameType = await RenderScanGameType.findOne({ contestId: contestId });
	return renderScanGameType?.entryFee
}

export const saveRenderScanContestResult = async (contestId: string, userId: string, fileUrl: string,) => {
	const scan = await RenderScan.create({ fileUrl: fileUrl, scan: "test", user: userId });
	await RenderScanResults.create({ userId: userId, scanId: scan, contestId: contestId })
}

export const doesUserFinishedRenderScanGame = async (userId: string, contestId: string) => {
	const result = await RenderScanResults.findOne({ userId: userId }).where({ contestId: contestId }).exec()
	if (result !== null) return true
}

export const doesUserStillPlayingRenderScanContest = async (contestId: string, userId: string) => {
	const contest = await RenderScanContest.findById(contestId)
	const isParticipating = contest?.contestants?.find((c) => { if (String(c) === String(userId)) return c })
	if (isParticipating) return true
	return false
}