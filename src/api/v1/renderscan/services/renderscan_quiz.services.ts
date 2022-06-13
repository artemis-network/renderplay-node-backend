import path from 'path'
import tsv from 'csvtojson'

import { db } from '../../db'
import { RenderScanContest } from '../models/renderscan_contest.model'

const { RenderScanQuiz, RenderScanQuizQuestion, RenderScanGameState } = db

export interface RenderScanQuizQuestionDTO {
	question: string, anwser: string, imageRef: string, opensAt: Date
}

export interface RenderScanQuizDTO { questions: string[], contest: string, lobbyTime: Date }

export const readRenderscanQuestionsDataFromTsvFile = async () => {
	const filePath = path.join(__dirname, "questions.tsv")
	return await tsv({ delimiter: '\t' }).fromFile(filePath);
}

export const generateRenderScanQuizQuestion = async (input: RenderScanQuizQuestionDTO) => {
	const { question, anwser, imageRef, opensAt } = input
	const createdQuestion = await RenderScanQuizQuestion
		.create({ question: question, anwser: anwser, imageRef: imageRef, opensAt: opensAt })
	return createdQuestion?._id
}

export const createRenderScanQuiz = async (input: RenderScanQuizDTO) => {
	const { questions, contest, lobbyTime } = input
	await RenderScanQuiz.create({ questions: questions, contest: contest, lobbyTime: lobbyTime });
}

export const getRenderScanCurrentLiveQuestion = (questions: any[]) => {
	for (let i = 0; i < questions.length; i++) {
		const now = new Date().getTime()
		const low = new Date(questions[i].opensAt).getTime()
		const high = low + (1000 * 60);
		const isLive = now > low && now < high
		if (isLive) return questions[i]
	}
	return null
}

export const getRenderScanEachQuestionInterval = (lobbyTime: Date, interval: number): Date => new Date(lobbyTime.getTime() + ((1000 * 60 * interval) + (1000 * 5)))

export const getRenderScanQuizByContestId = async (contest: string): Promise<any> => await RenderScanQuiz.findOne({ contest: contest }).populate('questions').exec();

export const doesGameCompleted = async (contestId: string) => {
	const contest = await getRenderScanQuizByContestId(contestId)
	const lastQuestionTime = new Date(new Date(contest.questions[4].opensAt).getTime() + (1000 * 60 * 1)).getTime();
	const now = new Date().getTime();
	if (lastQuestionTime - now <= 0) return true
	return false
}

export const getFirstQuestionOpensAt = async (contestId: string) => {
	try {
		const contest: any = await RenderScanContest.findById(contestId).populate("quiz")
		return new Date(contest.quiz.lobbyExpiresAt)
	} catch (error) {
		const err = new Error(String(error));
		console.log(err)
	}
}

export const getGameStateForUser = async (contestId: string, userId: string) =>
	await RenderScanGameState.findOne({ contest: contestId }).where({ user: userId })

export const updateRenderscanGameState = async (contestId: string, userId: string) => {
	try {
		const gameState = await getGameStateForUser(contestId, userId)
		const expiresAt = new Date(new Date().getTime() + (1000 * 60))
		console.log(gameState?.currentQuestionIndex)
		await gameState?.updateOne({
			$set: {
				currentQuestionStartsAt: new Date(),
				currentQuestionExpiresAt: expiresAt,
				currentQuestionIndex: (gameState?.currentQuestionIndex + 1)
			}
		})
		await gameState?.save()
	} catch (err) {
		console.log(err)
	}
}

export const createRenderscanGameStateForUser = async (
	userId: string, contestId: string, currentQuestionTime: Date,
) => {
	try {
		const expires = new Date(new Date(currentQuestionTime).getTime() + (1000 * 60 * 1))
		await RenderScanGameState.create({
			user: userId,
			contest: contestId,
			currentQuestionIndex: 0,
			currentQuestionStartsAt: currentQuestionTime,
			currentQuestionExpiresAt: expires,
		})
	} catch (err) {
		console.log(err)
	}
}