import {
	db,
} from '../../models/db'

import mongoose from 'mongoose'

import { logger } from '../../utils/logger'

const {
	User,
	UserWallet,
	RenderScan,
	RenderScanContest,
	RenderScanGameType,
	RenderScanResults, } = db

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

const enterIntoRenderScanContest = async (gameType: string, contestId: string, username: string, confirm: boolean) => {
	try {
		const user: any = await User.findOne({ username: username })
		const contest = await RenderScanContest.findById(contestId)
		const contestants = contest?.contestants;
		contestants?.map((contestant) => {
			if (String(contestant) === String(user?._id)) return { message: "Paid", "error": false }
		})
		if (confirm) {
			const rendleGameType = await RenderScanGameType.findOne({ gameType: gameType });
			const userWallet = await UserWallet.findOne({ user: user?._id }) || null;
			if ((rendleGameType?.entryFee || 0) > (userWallet?.balance || 0)) return { message: "insufficent funds", error: true }
			contestants?.push(user);
			await contest?.updateOne({
				$set: {
					contestants: contestants,
					prizePool: contest?.prizePool + (rendleGameType?.entryFee || 0)
				}
			})
			await contest?.save()
			userWallet?.updateOne({
				balance: (userWallet?.balance - (rendleGameType?.entryFee || 0))
			})
			return { message: "success", error: false }
		}
		return { message: "user or contest does not exist", error: true }
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
	username: string,
	fileurl: string,
) => {
	try {
		const user = await User.findOne({ username: username })
		const renderScanContest = await RenderScanContest.findById(contestId);
		const scan = await createRenderScan(fileurl, user?._id)
		await RenderScanResults.create({
			userId: user?._id,
			scanId: scan,
			contestId: renderScanContest?._id
		})
		return { message: "Successfully Posted" }
	} catch (error) {
		console.log(error)
		logger.error("👎 " + error)
		return { message: "Something went wrong" }
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


export {
	enterIntoRenderScanContest,
	saveRenderScanContestResult,
	getRenderScanContestants,
	getRenderScanParticipants
}