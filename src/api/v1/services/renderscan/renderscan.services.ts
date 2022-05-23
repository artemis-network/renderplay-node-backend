import { db } from '../../models/db'
import { RenderScanRefWord } from '../../models/renderscan/renderscan_ref_word.modal';
import { logger } from '../../utils/logger'

const {
	User,
	UserWallet,
	RenderScan,
	RenderScanContest,
	RenderScanGameType,
	RenderScanResults
} = db

const getRenderScanTypes = async () => {
	try {
		const renderScanTypes = await RenderScanGameType.find();
		return { renderScanTypes: renderScanTypes }
	} catch (e) {
		console.log(e)
		return { message: e }
	}
}

const createRenderScan = async (filename: string, user: any) => {
	try {
		const scan = await RenderScan.create({
			fileUrl: filename,
			scan: "test",
			user: user
		});
		return scan;
	} catch (e) {
		logger.error(e)
	}
}

const enterIntoRenderScanContest = async (contestId: string, userId: string, confirm: boolean) => {
	try {

		const user: any = await User.findById(userId)
		const contest = await RenderScanContest.findById(contestId)
		const contestants = contest?.contestants;
		const contestant = contestants?.find((contestant) => String(contestant) === String(userId))
		if (contestant) return { message: "PAID", "error": false }

		const renderScanGameType = await RenderScanGameType.findOne({ contestId: contestId });
		const userWallet = await UserWallet.findOne({ user: userId });
		if ((renderScanGameType?.entryFee || 0) > (userWallet?.balance || 0))
			return { message: "insufficent funds", error: true }
		contestants?.push(user);
		await contest?.updateOne({
			$set: {
				contestants: contestants,
				prizePool: contest?.prizePool + (renderScanGameType?.entryFee || 0)
			}
		})
		await contest?.save()
		await userWallet?.updateOne({
			balance: (userWallet?.balance - (renderScanGameType?.entryFee || 0))
		})
		return { message: "OK", error: false }
	} catch (error) {
		logger.error("error " + error)
		return { message: `something went wrong ${error}`, error: true }
	}
}

const getRenderScanContestants = async (contestId: string) => {
	try {
		const rendleContestants = await RenderScanContest.findById(contestId)
		return { contest: rendleContestants }
	} catch (e) {
		return { contest: null }
	}
}

const saveRenderScanContestResult = async (
	contestId: string,
	userId: string,
	fileUrl: string,
) => {
	try {
		const scan = await createRenderScan(fileUrl, userId)
		await RenderScanResults.create({
			userId: userId,
			scanId: scan,
			contestId: contestId
		})
		return { message: "Successfully Posted" }
	} catch (error) {
		console.log(error)
		logger.error("👎 " + error)
		return { message: "Something went wrong" }
	}
}

const getRenderScanGameStatus = async (userId: string, contestId: string) => {
	try {
		const result = await RenderScanResults.findOne({ userId: userId }).where({ contestId: contestId }).exec()
		if (result !== null) {
			if (result)
				return {
					id: result?._id,
					contestId: result.contestId,
					isSubmitted: true
				}
		}

		const contest = await RenderScanContest.findById(contestId)
		const isParticipating = contest?.contestants?.find((c) => { if (String(c) === String(userId)) return c })
		if (isParticipating) {
			return {
				contestId: contest?._id,
				isSubmitted: false
			}
		}
		return {
			isSubmitted: false
		}
	} catch (e) {
		return e;
	}
}

const getRenderScanParticipants = async (contestId: string) => {
	try {
		const results = await RenderScanResults.find()
		const participants: any = [];
		results.map((result) => {
			const _id = String(result?.contestId)
			if (_id === contestId) participants.push(result);
		})
		return { participants: participants };
	} catch (error) {
		return []
	}
}

const resetRenderScanGames = async (word: string, image: string, type: string) => {
	try {
		const gameType = await RenderScanGameType.findOne({ gameType: type })
		const refWord = await RenderScanRefWord.create({
			word: word,
			image: image
		})
		const contest = await RenderScanContest.create({
			prizePool: 0,
			minimumContestants: 10,
			contestants: [],
			refWord: refWord
		});
		await gameType?.updateOne({
			$set: {
				contestId: contest?._id,
				startsOn: Date.now()
			}
		});
		await gameType?.save();
		return { message: `reset successful, ${type}` }
	} catch (e) {
		return { message: e }
	}
}


export {
	getRenderScanTypes,
	resetRenderScanGames,
	getRenderScanGameStatus,
	getRenderScanContestants,
	getRenderScanParticipants,
	enterIntoRenderScanContest,
	saveRenderScanContestResult,
}