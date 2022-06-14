import { Request, Response } from 'express';
import { RendleResetServices } from '../services/rendle_reset.services'

// @desc reset all rendle contests
// @route /backend/v1/rendles/reset
// @access private
const addTime = (time: Date, timeInMilliseconds: number) =>
	new Date(new Date(time).getTime() + timeInMilliseconds)

const fiveMinutes = (1000 * 60 * 5)
const fourHours = (1000 * 60 * 60 * 4)

export const resetRendleContests = async (req: Request, res: Response) => {

	await RendleResetServices.resetRendlesGameState()
	const rendles: any = await RendleResetServices.getRendlesByIsVisible(true);
		var resetRendleIndex = -1;
	rendles.map(async (rendle: any, index: number) => {
		if (rendle.isExpired === true) {
				resetRendleIndex = index + 5
				//* index game is expired, so create a new contest
				await RendleResetServices.createRendleContest({
					gameTypeId: rendles[index].gameType._id,
					isExpired: false,
					gameType: rendles[index].gameType.gameType,
					startsOn: addTime(new Date(), fourHours),
					opensAt: addTime(new Date(), fourHours+fiveMinutes),
					expiresAt: addTime(new Date(), fourHours+(fiveMinutes * 2)),
				})
				RendleResetServices.setRendleIsVisibleToFalseAndIsExpiredToTrue(rendles[index])
				if (index === rendles.length - 1) {
					//*third game is resetting
					//* set first game to expired
					RendleResetServices.setRendleToExpired(rendles[0])
					//* set second game to live
					RendleResetServices.setRendleToLive(rendles[1])
			} else if (index == 0) {
					//*first game is resetting
					//* set second game to expired
					RendleResetServices.setRendleToExpired(rendles[1])
					//* set third game to live
					RendleResetServices.setRendleToLive(rendles[2])
			} else {
					///*second game is resetting
					//* set third game to expired
					RendleResetServices.setRendleToExpired(rendles[2])
					//* set first game to live
					RendleResetServices.setRendleToLive(rendles[0])
			}
		}
	})
		return res.status(200).json({ message: "reset completed for rendle#" + resetRendleIndex})
}