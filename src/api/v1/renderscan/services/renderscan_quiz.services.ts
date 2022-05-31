import path from 'path'
import tsv from 'csvtojson'

import { renderScanDomainObjects } from '../renderscan.objects'

const { RenderScanQuiz, RenderScanQuizQuestion, RenderScanGameType } = renderScanDomainObjects

export interface RenderScanQuizQuestionDTO {
	question: string, anwser: string, imageRef: string, opensAt: Date
}

export interface RenderScanQuizDTO { questions: string[], contestId: string, lobbyTime: Date }

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
	const { questions, contestId, lobbyTime } = input
	await RenderScanQuiz.create({ questions: questions, contestId: contestId, lobbyTime: lobbyTime });
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

export const getRenderScanQuizByContestId = async (contestId: string): Promise<any> => {
	return await RenderScanQuiz.findOne({ contestId: contestId }).populate('questions').exec();
}