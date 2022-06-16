import { db } from '../../db'

const { RendleContest, RendleGameState } = db;

type input = {
	startsOn: any, isExpired: boolean, gameType: number, gameTypeId: string,
	opensAt?: any, expiresAt?: any
}

type gameTypeEntryFee = { [key: number]: number };

const gameTypeEntryFee: gameTypeEntryFee = { 5: 1000, 6: 1500, 7: 2000 }

const addTime = (time: Date, timeInMilliseconds: number) =>
	new Date(new Date(time).getTime() + timeInMilliseconds)

const fiveMinutes = (1000 * 60 * 5)

export class RendleResetServices {

	static addTime = (time: Date, timeInMilliseconds: number): Date => {
		return new Date(new Date(time).getTime() + timeInMilliseconds)
	}


	static resetRendlesGameState = async () => {
		if ((await RendleGameState.countDocuments() > 0)) {
			await RendleGameState.collection.drop()
		}
	}

	static getRendlesByIsVisible = async (isVisible: boolean) => await RendleContest
		.find()
		.where({ isVisible: isVisible })
		.sort({ entryFee: 1 })
		.populate('gameType')
		.exec();

	static setRendleIsVisibleToFalseAndIsExpiredToTrue = async (rendle: any) => {
		await rendle?.updateOne({
			$set: {
				isVisible: false,
				isExpired: true
			}
		}); await rendle?.save();
	}

	static setRendleToLive = async (rendle: any) => {
		await rendle?.updateOne({
			$set: {
				startsOn: new Date(),
				opensAt: addTime(new Date(), fiveMinutes),
				expiresAt: addTime(new Date(), fiveMinutes * 3)
			}
		}); await rendle?.save();
	}

	static setRendleToExpired = async (rendle: any) => {
		await rendle?.updateOne({
			$set: {
				isExpired: true,
				opensAt: null,
				expiresAt: null
			}
		}); await rendle?.save();
	}


	static createRendleContest = async (inp: input) => {
		await RendleContest.create({
			entryFee: gameTypeEntryFee[inp.gameType],
			minimumContestants: 1,
			prizePool: 0,
			startsOn: inp.startsOn,
			isExpired: inp.isExpired,
			isVisible: true,
			contestants: [],
			gameType: inp.gameTypeId,
			opensAt: inp.opensAt,
			expiresAt: inp.expiresAt
		})
	}

}


