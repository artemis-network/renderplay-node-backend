import { db } from '../../db'

const { RendleContest, RendleGameState } = db;

type input = {
	startsOn: any, isExpired: boolean, gameType: number, gameTypeId: string,
	opensAt?: any, expiresAt?: any
}

type gameTypeEntryFee = { [key: number]: number };

const gameTypeEntryFee: gameTypeEntryFee = { 5: 1000, 6: 1500, 7: 2000 }

export class RendleResetServices {

	static resetRendlesGameState = async () => await RendleGameState.collection.drop()

	static getRendlesByIsVisible = async (isVisible: boolean) => await RendleContest
		.find()
		.where({ isVisible: isVisible })
		.sort({ entryFee: 1 })
		.populate('gameType')
		.exec();

	static setRendleIsVisibleAndIsExpiredToFalse = async (rendle: any) => {
		await rendle?.update({
			$set: {
				isVisible: false,
				isExpired: true
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


