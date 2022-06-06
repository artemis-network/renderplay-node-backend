import { RenderScan, RenderScanDoc } from './models/renderscan.model'
import { RenderScanQuiz, RenderScanQuizDoc } from './models/renderscan_quiz.model'
import { RenderScanResults, RenderScanResultDoc } from './models/renderscan_results'
import { RenderScanContest, RenderScanContestDoc } from './models/renderscan_contests.model'
import { RenderScanGameType, RenderScanGameTypeDoc } from './models/renderscan_game_type.modal'
import { RenderScanQuizQuestion, RenderScanQuizQuestionDoc } from './models/renderscan_quiz_question.model'

export const renderScanDomainObjects = {
	RenderScan,
	RenderScanQuiz,
	RenderScanContest,
	RenderScanResults,
	RenderScanGameType,
	RenderScanQuizQuestion,
}

export {
	RenderScanDoc,
	RenderScanQuizDoc,
	RenderScanResultDoc,
	RenderScanContestDoc,
	RenderScanGameTypeDoc,
	RenderScanQuizQuestionDoc
}