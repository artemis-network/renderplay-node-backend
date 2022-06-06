import { Request, Response } from 'express';
import { getRendlesByIsVisible, resetRendlesGameState, setRendleIsVisibleToFalse, getRendleGameTypes, createRendleContest } from '../services/rendle_reset.services'

// @desc reset all rendle contests
// @route /backend/v1/rendles/reset
// @access private
export const resetRendlesGameTypesController = async (req: Request, res: Response) => {
	if (req.body.password === "password@1234") {

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
					})
					setRendleIsVisibleToFalse(rendles[0])
					//* second game goes live
					await createRendleContest({
						gameTypeId: rendles[index - 1].gameType._id,
						isExpired: false,
						gameType: rendles[index - 1].gameType.gameType,
						startsOn: new Date(),
					})
					setRendleIsVisibleToFalse(rendles[index - 1])
				} else if (index == 0) {
					//* expire the next game
					await createRendleContest({
						gameTypeId: rendles[index + 1].gameType._id,
						isExpired: true,
						gameType: rendles[index + 1].gameType.gameType,
						startsOn: null,
					})
					setRendleIsVisibleToFalse(rendles[index + 1])
					//* live the last game
					await createRendleContest({
						gameTypeId: rendles[index + 2].gameType._id,
						isExpired: false,
						gameType: rendles[index + 2].gameType.gameType,
						startsOn: new Date(),
					})
					setRendleIsVisibleToFalse(rendles[index + 2])
				} else {
					// expiring next game
					await createRendleContest({
						gameTypeId: rendles[index + 1].gameType._id,
						isExpired: true,
						startsOn: null,
						gameType: rendles[index + 1].gameType.gameType,
					})
					setRendleIsVisibleToFalse(rendles[index + 1])
					// live first game
					await createRendleContest({
						gameTypeId: rendles[0].gameType._id,
						isExpired: false,
						startsOn: new Date(),
						gameType: rendles[0].gameType.gameType,
					})
					setRendleIsVisibleToFalse(rendles[0])
				}

				const now = new Date(new Date())
				const fourHours = 60 * 60 * 4 * 1000;

				let newTime: any = new Date(now.getTime() + fourHours).toUTCString()
				newTime = new Date(newTime)

				await createRendleContest({
					gameTypeId: rendles[index].gameType._id,
					isExpired: false,
					startsOn: newTime,
					gameType: rendles[index].gameType.gameType,
				})
				setRendleIsVisibleToFalse(rendles[index])
			}
		})

		return res.status(200).json({ message: "reset completed" })
	}
	return res.status(200).json({ message: "Invalid Password" })
}