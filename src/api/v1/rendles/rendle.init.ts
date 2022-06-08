import { rendleGameTypes, RendleGameType } from '../rendles/data/rendleGameTypes'
import { db, RendleGameTypeDocument, RendleContestDocument } from '../db'
import { logger } from '../utils/logger'
import moment from 'moment'

const { RendleGameType, RendleContest } = db

type RendleGameTypeInput = { gameType: RendleGameTypeDocument['gameType']; };

type RendleContestInput = {
	minimumContestants: RendleContestDocument['minimumContestants'];
	startsOn?: RendleContestDocument['startsOn'];
	isExpired: RendleContestDocument['isExpired'];
	expiresAt?: RendleContestDocument['expiresAt'];
	opensAt?: RendleContestDocument['opensAt'];
	isVisible: RendleContestDocument['isVisible'];
	prizePool: RendleContestDocument['prizePool'];
	contestants: RendleContestDocument['contestants'];
	gameType: RendleContestDocument['gameType'];
	entryFee: RendleContestDocument['entryFee']
};

type gameTypeExpiryStatus = { [key: number]: boolean };

type gameTypeStartsOn = { [key: number]: any };

function getCurrentIndianDateTime() {
	var time = moment.utc().format()
	return new Date();
}

const gameTypeExpiryStatus: gameTypeExpiryStatus = {
	5: false,
	6: false,
	7: true
}

const gameTypeStartsOn: gameTypeStartsOn = {
	5: getCurrentIndianDateTime(),
	6: new Date((getCurrentIndianDateTime().getTime() + 4 * 60 * 60 * 1000)),
	7: new Date(0)
}

const addTimeToDate = (date: Date, timeInMilliseconds: number): Date => new Date(date.getTime() + timeInMilliseconds)

const createRendleContest = async (gameType: number, entryFee: number, gameTypeId: RendleGameTypeDocument) => {
	try {
		logger.info(`>> creating new contest for Rendle ${gameType} with StartsOn ${gameTypeStartsOn[gameType]}`)

		const tenMinutes = 1000 * 60 * 10

		const opensAt = addTimeToDate(gameTypeStartsOn[gameType], tenMinutes);
		const expiresAt = addTimeToDate(opensAt, tenMinutes)

		const input: RendleContestInput = {
			entryFee: entryFee,
			minimumContestants: 1,
			prizePool: 0,
			opensAt: opensAt || null,
			expiresAt: expiresAt || null,
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
			console.log(rendleGameType)
			createRendleGameType(rendleGameType);
		})
	}
}

export { initializeRendleGames }