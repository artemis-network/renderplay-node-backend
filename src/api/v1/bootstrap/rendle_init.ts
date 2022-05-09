import { rendleGameTypes, RendleGameType } from '../data/rendleGameTypes'
import { db, RendleGameTypeDocument, RendleContestDocument } from '../models/db'
import { logger } from '../utils/logger'

const { RendleGameType, RendleContest } = db

type RendleGameTypeInput = {
	gameType: RendleGameTypeDocument['gameType'];
	startsOn?: RendleGameTypeDocument['startsOn'];
	contestId?: RendleGameTypeDocument['contestId'];
	isExpired: RendleGameTypeDocument['isExpired'],
	entryFee: RendleGameTypeDocument['entryFee'],
};

type RendleContestInput = {
	minimumContestants: RendleContestDocument['minimumContestants'];
	prizePool: RendleContestDocument['prizePool'];
};

const createRendleContest = async () => {
	try {
		const input: RendleContestInput = {
			minimumContestants: 1,
			prizePool: 0
		}
		const contest = await RendleContest.create(input)
		return contest._id;
	} catch (e) {
		logger.error(e)
	}
}

const createRendleGameType = async (rendleGameType: RendleGameType) => {
	try {
		if (!rendleGameType.isExpired) {
			const contestId = await createRendleContest();
			const input: RendleGameTypeInput = {
				gameType: rendleGameType.gameType,
				startsOn: rendleGameType.startsOn,
				isExpired: rendleGameType.isExpired,
				entryFee: rendleGameType.entryFee,
				contestId: contestId
			}
			await RendleGameType.create(input)
		} else {
			const input: RendleGameTypeInput = {
				gameType: rendleGameType.gameType,
				startsOn: rendleGameType.startsOn,
				isExpired: rendleGameType.isExpired,
				entryFee: rendleGameType.entryFee,
				contestId: ""
			}
			await RendleGameType.create(input)
		}
	} catch (e) {
		logger.error(e)
	}
}

const initializeRendleGames = async () => {
	const count = await (await RendleGameType.find()).length;
	if (count <= 0) {
		rendleGameTypes.map((rendleGameType) => {
			createRendleGameType(rendleGameType);
		})
	}
}

export { initializeRendleGames }