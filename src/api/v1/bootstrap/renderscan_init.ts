import { renderscanGameTypes, RenderScanGameTypes } from '../data/renderscanGameTypes'
import { db, RenderScanGameTypeDocument, RenderScanContestDocument, RenderScanRefWordDocument } from '../models/db'

import { logger } from '../utils/logger'

const { RenderScanGameType, RenderScanContest, RenderScanRefWord } = db

export type RenderScanRefWordInput = {
	word: RenderScanRefWordDocument['word'],
	image: RenderScanRefWordDocument['image'],
}

const createRenderScanRefWord = async (renderScanRefWordInput: RenderScanRefWordInput) => {
	try {
		const refWord = await RenderScanRefWord.create(renderScanRefWordInput);
		return refWord?._id;
	} catch (error) {
		logger.error(">> Error " + error);
	}
}

type RenderScanGameTypeInput = {
	gameType: RenderScanGameTypeDocument['gameType'];
	startsOn?: RenderScanGameTypeDocument['startsOn'];
	contestId?: RenderScanGameTypeDocument['contestId'];
	isExpired: RenderScanGameTypeDocument['isExpired'],
	entryFee: RenderScanGameTypeDocument['entryFee'],
};

type RenderScanContestInput = {
	minimumContestants: RenderScanContestDocument['minimumContestants'];
	prizePool: RenderScanContestDocument['prizePool'];
	refWord: RenderScanContestDocument['refWord']
};

const createRenderScanContest = async (renderScanRefWordAsInput: RenderScanRefWordInput) => {
	try {
		const refWord = await createRenderScanRefWord(renderScanRefWordAsInput)
		const input: RenderScanContestInput = {
			minimumContestants: 1,
			prizePool: 0,
			refWord: refWord?._id
		}
		const contest = await RenderScanContest.create(input)
		return contest._id;
	} catch (e) {
		logger.error(e)
	}
}

const createRenderScanGameTypes = async (
	renderScanGameType: RenderScanGameTypes,
	renderScanRefWordAsInput: RenderScanRefWordInput
) => {

	try {
		if (!renderScanGameType.isExpired) {
			const contestId = await createRenderScanContest(renderScanRefWordAsInput);
			const input: RenderScanGameTypeInput = {
				gameType: renderScanGameType.gameType,
				startsOn: renderScanGameType.startsOn,
				isExpired: renderScanGameType.isExpired,
				entryFee: renderScanGameType.entryFee,
				contestId: contestId
			}
			await RenderScanGameType.create(input)
		} else {
			const input: RenderScanGameTypeInput = {
				gameType: renderScanGameType.gameType,
				startsOn: renderScanGameType.startsOn,
				isExpired: renderScanGameType.isExpired,
				entryFee: renderScanGameType.entryFee,
				contestId: ""
			}
			await RenderScanGameType.create(input)
		}
	} catch (e) {
		logger.error(e)
	}
}

const initializeRenderScanGames = async (renderScanRefWordAsInput: RenderScanRefWordInput) => {
	await RenderScanGameType.collection.drop()
	const count = await (await RenderScanGameType.find()).length;
	if (count <= 0) {
		renderscanGameTypes.map((renderScanGameType) => {
			createRenderScanGameTypes(renderScanGameType, renderScanRefWordAsInput);
		})
	}
}

export { initializeRenderScanGames }

