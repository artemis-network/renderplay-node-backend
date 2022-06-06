import path from 'path'
import tsv from 'csvtojson'

import { renderScanDomainObjects } from './renderscan.objects'
const { RenderScanQuiz, RenderScanContest, RenderScanGameType, RenderScanQuizQuestion } = renderScanDomainObjects

interface QuizQuestion { question: string; anwser: string; imageUrl: string; opensAt: Date }
interface RenderScanGameTypeObject { entryFee: number, gameType: string, category: string, filename: string };
interface RenderScanContest { entryFee: number; gameType: string; startsOn: Date; prizePool: number; contestants: string[]; mininumContestants: number; quiz: Object; }

enum RenderScanGameTypeEnum { FREE = "[FREE]", PAID = "[PAID]" }
enum RenderScanCategory { SPORTS = '[SPORTS]', CELEBRITY = '[CELEBRITY]', GEOGRAPHY = '[GEOGRAPHY]', GENERAL = '[GENERAL]', ANIMALS = '[ANIMALS]', }


const readTsvQuizQuestionsFile = async (gameType: string, filename: string) => {
	const filePath = path.join(__dirname, "data", "quiz", gameType, filename)
	return await tsv({ delimiter: '\t' }).fromFile(filePath);
}

const renderScanGameTypes: RenderScanGameTypeObject[] = [
	{ entryFee: 0, gameType: RenderScanGameTypeEnum.FREE, category: RenderScanCategory.SPORTS, filename: "sports.tsv" },
	{ entryFee: 0, gameType: RenderScanGameTypeEnum.FREE, category: RenderScanCategory.CELEBRITY, filename: "celebrity.tsv" },
	{ entryFee: 0, gameType: RenderScanGameTypeEnum.FREE, category: RenderScanCategory.GEOGRAPHY, filename: "geography.tsv" },
	{ entryFee: 0, gameType: RenderScanGameTypeEnum.FREE, category: RenderScanCategory.GENERAL, filename: "general.tsv" },
	{ entryFee: 0, gameType: RenderScanGameTypeEnum.FREE, category: RenderScanCategory.ANIMALS, filename: "animals.tsv" },
	{ entryFee: 1500, gameType: RenderScanGameTypeEnum.PAID, category: RenderScanCategory.SPORTS, filename: "sports.tsv" },
	{ entryFee: 1500, gameType: RenderScanGameTypeEnum.PAID, category: RenderScanCategory.CELEBRITY, filename: "celebrity.tsv" },
	{ entryFee: 1500, gameType: RenderScanGameTypeEnum.PAID, category: RenderScanCategory.GEOGRAPHY, filename: "geography.tsv" },
	{ entryFee: 1500, gameType: RenderScanGameTypeEnum.PAID, category: RenderScanCategory.GENERAL, filename: "general.tsv" },
	{ entryFee: 1500, gameType: RenderScanGameTypeEnum.PAID, category: RenderScanCategory.ANIMALS, filename: "animals.tsv" },
]

export const createRenderScanGameType = async () => {
	for (let i = 0; i < renderScanGameTypes.length; i++) await RenderScanGameType.create(renderScanGameTypes[i]);
	await createRenderScanContests()
}

const getRenderScanEachQuestionInterval = (lobbyTime: Date, interval: number): Date => new Date(lobbyTime.getTime() + (1000 * 60 * interval))

const createQuizQuestionsForRenderScanContest = async (questions: QuizQuestion[], lobbyTime: Date) => {
	const quizQuestionIds = []
	for (let i = 0; i < questions.length; i++) {
		const opensAt: Date = getRenderScanEachQuestionInterval(lobbyTime, i);
		const quizQuestions = await RenderScanQuizQuestion.create({
			question: questions[i].question,
			anwser: questions[i].anwser,
			imageUrl: questions[i].imageUrl,
			opensAt: opensAt
		})
		quizQuestionIds.push(quizQuestions._id);
	}
	return quizQuestionIds;
}

const createRenderScanContest = async (renderScanObject: RenderScanContest, gameType: string, filename: string) => {
	const renderscan = await RenderScanContest.create({
		gameType: renderScanObject.gameType,
		entryFee: renderScanObject.entryFee,
		startsOn: renderScanObject.startsOn,
		prizePool: renderScanObject.prizePool,
		minimumContestants: renderScanObject.mininumContestants,
		contestants: renderScanObject.contestants,
	})
	const lobbyExpiresAt: Date = new Date(new Date(renderScanObject.startsOn).getTime() + (1000 * 60 * 10));
	const questionsFromTsv = await readTsvQuizQuestionsFile(gameType, filename);
	const questions = await createQuizQuestionsForRenderScanContest(questionsFromTsv, lobbyExpiresAt);
	const quiz = await RenderScanQuiz.create({ contest: renderscan?._id, questions: questions, lobbyExpiresAt: lobbyExpiresAt })
	await renderscan.updateOne({ $set: { quiz: quiz?._id } })
}

const createRenderScanContests = async () => {
	const freeGameTypes = await RenderScanGameType.find().where({ gameType: RenderScanGameTypeEnum.FREE });
	const paidGameTypes = await RenderScanGameType.find().where({ gameType: RenderScanGameTypeEnum.PAID });
	const hour = (1000 * 60 * 60)

	let freeGameTypeTimeInterval: number = 1;
	let paidGameTypeTimeInterval: number = 2;

	for (let i = 0; i < freeGameTypes.length; i++) {
		const now = new Date().getTime();
		const contestTime: Date = new Date(now + (freeGameTypeTimeInterval * hour))
		await createRenderScanContest({
			gameType: freeGameTypes[i]._id,
			startsOn: contestTime,
			entryFee: freeGameTypes[i].entryFee,
			mininumContestants: 0, prizePool: 0, contestants: [], quiz: ""
		}, freeGameTypes[i].gameType, freeGameTypes[i].filename)

		freeGameTypeTimeInterval += 2
	}

	for (let i = 0; i < paidGameTypes.length; i++) {
		const now = new Date().getTime();
		const contestTime: Date = new Date(now + (paidGameTypeTimeInterval * hour))
		await createRenderScanContest({
			gameType: paidGameTypes[i]._id,
			startsOn: contestTime,
			entryFee: paidGameTypes[i].entryFee,
			mininumContestants: 0,
			prizePool: 0,
			contestants: [],
			quiz: ""
		}, paidGameTypes[i].gameType, paidGameTypes[i].filename)

		paidGameTypeTimeInterval += 2;
	}
}

export const renderScanResetOneByContesyId = async (gameType: string, filename: string) => {
	const renderscan = await RenderScanContest.create({
		gameType: gameType,
		prizePool: 0,
		startsOn: new Date(),
		minimumContestants: 50,
		contestants: []
	})
	const lobbyExpiresAt: Date = new Date(new Date().getTime() + (1000 * 60 * 10));
	const questionsFromTsv = await readTsvQuizQuestionsFile(gameType, filename);
	const questions = await createQuizQuestionsForRenderScanContest(questionsFromTsv, lobbyExpiresAt);
	const quiz = await RenderScanQuiz.create({ contest: renderscan?._id, questions: questions, lobbyExpiresAt: lobbyExpiresAt })
	await renderscan?.updateOne({ $set: { quiz: quiz?._id } })
} 