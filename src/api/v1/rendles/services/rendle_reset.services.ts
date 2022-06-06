import { db } from '../../db'

const { RendleGameType, RendleContest, RendleGameState } = db;

type gameTypeEntryFee = { [key: number]: number };
const gameTypeEntryFee: gameTypeEntryFee = { 5: 1000, 6: 1500, 7: 2000 }

export const resetRendlesGameState = async () => await RendleGameState.collection.drop()
export const getRendlesByIsVisible = async (isVisible: boolean) => await RendleContest.find().where({ isVisible: isVisible }).populate('gameType').exec();
export const setRendleIsVisibleToFalse = async (rendle: any) => {
	await rendle?.update({ $set: { isVisible: false } })
	await rendle?.save();
}

type input = {
	startsOn: any, isExpired: boolean, gameType: number, gameTypeId: string
}

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

export const getRendleGameTypes = async () => await RendleGameType.find().sort({ gameType: 1 })


export const resetRendlesGameTypes = async () => {
	const rendles = await RendleContest.find().where({ isVisible: true })
}