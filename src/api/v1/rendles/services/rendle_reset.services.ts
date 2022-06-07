import { db } from '../../db'

const { RendleContest, RendleGameState } = db;

type gameTypeEntryFee = { [key: number]: number };
const gameTypeEntryFee: gameTypeEntryFee = { 5: 1000, 6: 1500, 7: 2000 }

export const resetRendlesGameState = async () => await RendleGameState.collection.drop()
export const getRendlesByIsVisible = async (isVisible: boolean) => await RendleContest.find()
	.where({ isVisible: isVisible })
	.populate('gameType')
	.exec();

export const setRendleIsVisibleAndIsExpiredToFalse = async (rendle: any) => {
	await rendle?.update({
		$set: {
			isVisible: false,
			isExpired: true
		}
	}); await rendle?.save();
}

type input = { startsOn: any, isExpired: boolean, gameType: number, gameTypeId: string }

export const createRendleContest = async (inp: input) => {
	await RendleContest.create({
		entryFee: gameTypeEntryFee[inp.gameType],
		minimumContestants: 1,
		prizePool: 0,
		startsOn: inp.startsOn,
		isExpired: inp.isExpired,
		isVisible: true,
		contestants: [],
		gameType: inp.gameTypeId
	})
}