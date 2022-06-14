import { Request, Response } from 'express';
import { getRendlesByIsVisible, setRendleIsVisibleAndIsExpiredToFalse, createRendleContest, dropRendGameState } from '../services/rendle_reset.services'

// @desc reset all rendle contests
// @route /backend/v1/rendles/reset
// @access private

const addTime = (time: Date, timeInMilliseconds: number) => new Date(new Date(time).getTime() + timeInMilliseconds)
const fiveMinutes = (1000 * 60 * 5)

export const resetRendlesGameTypesController = async (req: Request, res: Response) => {
	if (req.body.password === "password@1234") {

		await dropRendGameState()

		const rendles: any = await getRendlesByIsVisible(true);

		rendles.map(async (rendle: any, index: number) => {
			if (rendle.isExpired === true) {
				if (index === rendles.length - 1) {
					//* first game expires
					await createRendleContest({
						gameTypeId: rendles[0].gameType._id,
						isExpired: true,
						gameType: rendles[0].gameType.gameType,
						startsOn: null,
						opensAt: null,
						expiresAt: null
					})
					setRendleIsVisibleAndIsExpiredToFalse(rendles[0])
					//* second game goes live
					await createRendleContest({
						gameTypeId: rendles[index - 1].gameType._id,
						isExpired: false,
						gameType: rendles[index - 1].gameType.gameType,
						startsOn: new Date(),
						opensAt: addTime(new Date(), fiveMinutes),
						expiresAt: addTime(new Date(), fiveMinutes * 2),
					})
					setRendleIsVisibleAndIsExpiredToFalse(rendles[index - 1])
				} else if (index == 0) {
					//* expire the next game
					await createRendleContest({
						gameTypeId: rendles[index + 1].gameType._id,
						isExpired: true,
						gameType: rendles[index + 1].gameType.gameType,
						startsOn: null,
						opensAt: null,
						expiresAt: null
					})
					setRendleIsVisibleAndIsExpiredToFalse(rendles[index + 1])
					//* live the last game
					await createRendleContest({
						gameTypeId: rendles[index + 2].gameType._id,
						isExpired: false,
						gameType: rendles[index + 2].gameType.gameType,
						startsOn: new Date(),
						opensAt: addTime(new Date(), fiveMinutes),
						expiresAt: addTime(new Date(), fiveMinutes * 2),
					})
					setRendleIsVisibleAndIsExpiredToFalse(rendles[index + 2])
				} else {
					// expiring next game
					await createRendleContest({
						gameTypeId: rendles[index + 1].gameType._id,
						isExpired: true,
						startsOn: null,
						opensAt: null,
						expiresAt: null,
						gameType: rendles[index + 1].gameType.gameType,
					})
					setRendleIsVisibleAndIsExpiredToFalse(rendles[index + 1])
					// live first game
					await createRendleContest({
						gameTypeId: rendles[0].gameType._id,
						isExpired: false,
						startsOn: new Date(),
						gameType: rendles[0].gameType.gameType,
						opensAt: addTime(new Date(), fiveMinutes),
						expiresAt: addTime(new Date(), fiveMinutes * 2),
					})
					setRendleIsVisibleAndIsExpiredToFalse(rendles[0])
				}

				const now = new Date(new Date())
				const fourHours = 60 * 60 * 4 * 1000;

				let newTime: any = new Date(now.getTime() + fourHours).toUTCString()
				newTime = new Date(newTime)

				await createRendleContest({
					gameTypeId: rendles[index].gameType._id,
					isExpired: false,
					startsOn: newTime,
					opensAt: addTime(newTime, fiveMinutes),
					expiresAt: addTime(newTime, fiveMinutes * 2),
					gameType: rendles[index].gameType.gameType,
				})
				setRendleIsVisibleAndIsExpiredToFalse(rendles[index])
			}
		})

		return res.status(200).json({ message: "reset completed" })
	}
	return res.status(200).json({ message: "Invalid Password" })
}