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
	contestants: RendleContestDocument['contestants'];
};

const createRendleContest = async (gameType: number) => {
	try {
		logger.info(`>> creating new contest for ${gameType}`)
		const input: RendleContestInput = {
			minimumContestants: 1,
			prizePool: 0,
			contestants: []
		}
		const contest = await RendleContest.create(input)
		logger.info(`>> successfully created contest ${contest._id}`)
		return contest._id;
	} catch (e) {
		logger.error(e)
	}
}

const createRendleGameType = async (rendleGameType: RendleGameType) => {
	try {
		logger.info(`>> creating rendle ${rendleGameType.gameType}`)
		if (!rendleGameType.isExpired) {
			const contestId = await createRendleContest(rendleGameType.gameType);
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
		logger.info(`>> created rendle ${rendleGameType.gameType}`)
	} catch (e) {
		logger.error(e)
	}
}

const initializeRendleGames = async () => {
	logger.info(">> checking for rendles collection")
	const count = await (await RendleGameType.find()).length;
	if (count <= 0) {
		logger.info(">> creating rendles")
		rendleGameTypes.map((rendleGameType) => {
			createRendleGameType(rendleGameType);
		})
	}
}

export { initializeRendleGames }