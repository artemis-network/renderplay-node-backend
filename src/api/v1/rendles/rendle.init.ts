import { rendleGameTypes, RendleGameType } from '../rendles/data/rendleGameTypes'
import { db, RendleGameTypeDocument, RendleContestDocument } from '../db'
import { logger } from '../utils/logger'
import moment from 'moment'

const { RendleGameType, RendleContest } = db

type RendleGameTypeInput = {
	gameType: RendleGameTypeDocument['gameType'];
};

type RendleContestInput = {
	minimumContestants: RendleContestDocument['minimumContestants'];
	startsOn?: RendleContestDocument['startsOn'];
	isExpired: RendleContestDocument['isExpired'],
	isVisible: RendleContestDocument['isVisible'],
	prizePool: RendleContestDocument['prizePool'];
	contestants: RendleContestDocument['contestants'];
	gameType: RendleContestDocument['gameType'];
	entryFee: RendleContestDocument['entryFee']
};

type gameTypeExpiryStatus = {
	[key: number]: boolean
};

type gameTypeStartsOn = {
	[key: number]: any
};

function getCurrentIndianDateTime() {
	var time = moment.utc().format()
	return new Date(time);
}


const gameTypeExpiryStatus: gameTypeExpiryStatus = {
	5: false,
	6: false,
	7: true
}

const gameTypeStartsOn: gameTypeStartsOn = {
	5: getCurrentIndianDateTime(),
	6: (getCurrentIndianDateTime().getTime() + 4 * 60 * 60 * 1000),
	7: null
}

const createRendleContest = async (gameType: number, entryFee: number, gameTypeId: RendleGameTypeDocument) => {
	try {
		logger.info(`>> creating new contest for Rendle ${gameType} with StartsOn ${gameTypeStartsOn[gameType]}`)
		const input: RendleContestInput = {
			entryFee: entryFee,
			minimumContestants: 1,
			prizePool: 0,
			startsOn: gameTypeStartsOn[gameType],
			isExpired: gameTypeExpiryStatus[gameType],
			isVisible: true,
			contestants: [],
			gameType: gameTypeId._id
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
		const input: RendleGameTypeInput = { gameType: rendleGameType.gameType }
		const gameTypeId = await RendleGameType.create(input)
		await createRendleContest(rendleGameType.gameType, rendleGameType.entryFee, gameTypeId);
		logger.info(`>> created rendle contest => ${rendleGameType.gameType}`)
	} catch (e) {
		logger.error(e)
	}
}

const initializeRendleGames = async () => {
	logger.info(">> checking for rendles collection")
	const count = (await RendleGameType.find()).length;
	if (count <= 0) {
		logger.info(">> creating rendles")
		rendleGameTypes.map((rendleGameType) => {
			createRendleGameType(rendleGameType);
		})
	}
}

export { initializeRendleGames }