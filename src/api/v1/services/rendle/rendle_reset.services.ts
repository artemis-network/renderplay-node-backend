import { db } from '../../models/db'
import { logger } from '../../utils/logger';

const { RendleGameType, RendleContest, RendleGameState } = db;

const createRendleContest = async () => {
	try {
		const contest = await RendleContest.create({
			minimumContestants: 1,
			prizePool: 0
		})
		return contest._id;
	} catch (e) {
		logger.error(e)
	}
}

export const resetRendlesGameTypes = async () => {
	try {
		await RendleGameState.collection.drop()
		const rendles = await RendleGameType.find().sort({ gameType: 1 })
		rendles.map(async (rendle, index) => {
			if (rendle.isExpired === true) {
				if (index === rendles.length - 1) {
					//* first game expires
					await rendles[0].updateOne({
						$set: {
							isExpired: true,
							startsOn: null,
							contestId: null,
						}
					});
					await rendles[0].save();
					//* second game goes live
					await rendles[index - 1].updateOne({
						$set: {
							isExpired: false,
							startsOn: Date.now(),
						}
					})
					await rendles[index - 1].save()
				} else if (index == 0) {
					//* expire the next game
					await rendles[index + 1].updateOne({
						$set: {
							isExpired: true,
							startsOn: null,
							contestId: null
						}
					})
					await rendles[index + 1].save()
					//* live the last game
					await rendles[index + 2].updateOne({
						$set: {
							isExpired: false,
							startsOn: Date.now()
						}
					})
					await rendles[index + 2].save();
				} else {
					// expiring next game
					await rendles[index + 1].updateOne({
						$set: {
							isExpired: true,
							startsOn: null,
							contestId: null
						}
					})
					await rendles[index + 1].save();
					// live first game
					await rendles[0].updateOne({
						$set: {
							isExpired: false,
							startsOn: Date.now()
						}
					})
					await rendles[0].save()
				}

				const rendleContest = await createRendleContest()
				const now = new Date(Date.now())
				const fourHours = 60 * 60 * 4 * 1000;

				let newTime: any = new Date(now.getTime() + fourHours).toUTCString()
				newTime = new Date(newTime)
				await rendles[index].updateOne({
					$set: {
						isExpired: false,
						contestId: rendleContest,
						startsOn: newTime,
					}
				})
				await rendles[index].save()
			}
		})
		return { message: `Reset of Rendle ${rendles[0].gameType} successful` }
	} catch (e) {
		logger.error(e)
		return { message: `Error => ${e}` }
	}
}