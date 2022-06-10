import path from 'path'
import tsv from 'csvtojson'

import { db } from '../db'
const { RenderScanQuiz, RenderScanContest, RenderScanGameType, RenderScanQuizQuestion, RenderScanContestTypeState } = db

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
	const lobbyExpiresAt: Date = new Date(new Date(renderScanObject.startsOn).getTime() + (1000 * 60 * 1));
	const questionsFromTsv = await readTsvQuizQuestionsFile(gameType, filename);
	const questions = await createQuizQuestionsForRenderScanContest(questionsFromTsv, lobbyExpiresAt);
	const quiz = await RenderScanQuiz.create({ contest: renderscan?._id, questions: questions, lobbyExpiresAt: lobbyExpiresAt })
	await renderscan.updateOne({ $set: { quiz: quiz?._id } })
}

const createRenderScanContests = async () => {

	const gameTypesState = ["[FREE]", "[PAID]", "[PAID]"]
	const categoryState = ["[SPORTS]", "[GEOGRAPHY]", "[CELEBRITY]", "[GENERAL]", "[ANIMALS]"]

	const hour = (1000 * 60 * 60)
	let timeInterval = 0

	for (let i = 0; i < gameTypesState.length; i++) {
		const now = new Date().getTime();
		const contestTime: Date = new Date(now + (timeInterval * hour))
		console.log(gameTypesState[i], categoryState[i])
		const game: any = await RenderScanGameType.findOne({ gameType: gameTypesState[i] }).where({ category: categoryState[i] })
		console.log(game)

		await createRenderScanContest({
			gameType: game?._id,
			startsOn: contestTime,
			entryFee: game?.entryFee,
			mininumContestants: 0, prizePool: 0, contestants: [], quiz: ""
		}, game?.gameType, game?.filename)

		timeInterval += 2
	}

	await RenderScanContestTypeState.create({ gameTypeCounter: 2, categoryTypeCounter: 2 })
}

export const renderScanResetOneByContesyId = async () => {

	const state: any = await RenderScanContestTypeState.findOne()
	const gameTypesState = ["[FREE]", "[PAID]", "[PAID]"]
	const categoryState = ["[SPORTS]", "[GEOGRAPHY]", "[CELEBRITY]", "[GENERAL]", "[ANIMALS]"]

	let gameTypeCounter = state?.gameTypeCounter + 1
	let categoryTypeCounter = state?.categoryTypeCounter + 1

	if (gameTypeCounter >= 3) gameTypeCounter = 0
	if (categoryTypeCounter >= 5) categoryTypeCounter = 0


	const gameType: any = await RenderScanGameType
		.findOne({ gameType: gameTypesState[gameTypeCounter] })
		.where({ category: categoryState[categoryTypeCounter] })


	const time = new Date().getTime() + (1000 * 60 * 60 * 4)
	const renderscan = await RenderScanContest.create({
		gameType: gameType?._id,
		entryFee: gameType?.entryFee,
		prizePool: 0,
		startsOn: new Date(time),
		minimumContestants: 50,
		contestants: []
	})
	const lobbyExpiresAt: Date = new Date(new Date().getTime() + (1000 * 60 * 10));
	console.log(lobbyExpiresAt)
	const questionsFromTsv = await readTsvQuizQuestionsFile(gameType.gameType, gameType.filename);
	console.log(questionsFromTsv)
	const questions = await createQuizQuestionsForRenderScanContest(questionsFromTsv, lobbyExpiresAt);
	console.log(questions)
	const quiz = await RenderScanQuiz.create({ contest: renderscan?._id, questions: questions, lobbyExpiresAt: lobbyExpiresAt })
	console.log(quiz)
	await renderscan?.updateOne({ $set: { quiz: quiz?._id } })
	await RenderScanContestTypeState.findOne().updateOne({
		gameTypeCounter: gameTypeCounter, categoryTypeCounter: categoryTypeCounter
	})
} 