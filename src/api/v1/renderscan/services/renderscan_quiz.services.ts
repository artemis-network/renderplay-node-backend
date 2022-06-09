import path from 'path'
import tsv from 'csvtojson'

import { db } from '../../db'

const { RenderScanQuiz, RenderScanQuizQuestion } = db

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
		console.log(low.toLocaleString())
		const high = low + (1000 * 60);
		const isLive = now > low && now < high
		if (isLive) return questions[i]
	}
	return null
}

export const getRenderScanEachQuestionInterval = (lobbyTime: Date, interval: number): Date => new Date(lobbyTime.getTime() + ((1000 * 60 * interval) + (1000 * 5)))

export const getRenderScanQuizByContestId = async (contest: string): Promise<any> => {
	return await RenderScanQuiz.findOne({ contest: contest }).populate('questions').exec();
}

export const doesGameCompleted = async (contestId: string) => {
	const contest = await getRenderScanQuizByContestId(contestId)
	const lastQuestionTime = new Date(new Date(contest.questions[4].opensAt).getTime() + (1000 * 60 * 1)).getTime();
	const now = new Date().getTime();
	if (lastQuestionTime - now <= 0) return true
	return false
}