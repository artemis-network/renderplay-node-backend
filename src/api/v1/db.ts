import mongoose from 'mongoose';

import { logger } from './utils/logger';

import { User, UserDocument, UserType } from './user/models/user.model'
import { UserWallet, UserWalletDocument, UserWalletType } from './user/models/wallet.model'

import { RenderverseEmails, RenderverseEmailsDocument, } from './user/models/rendervers_emails.model'

import { RendleWord, RendleWordDocument, RendleWordType } from './rendles/models/rendle_word.model'
import { RendleContest, RendleContestDocument, RendleContestType } from './rendles/models/rendle_contest.model'
import { RendleResult, RendleResultsDocument, RendleResultType } from './rendles/models/rendle_result.model'
import { RendleGameType, RendleGameTypeDocument, RendleGameTypeType } from './rendles/models/rendle_game_type.model'
import { RendleGameState, RendleGameStateDocument, RendleGameStateType } from './rendles/models/rendle_game_state.model'
import { RendleContestant, RendleContestantDocument, RendleContestantType, } from './rendles/models/rendle_contestant.model'

import { RenderScan, RenderScanDoc } from './renderscan/models/renderscan.model'
import { RenderScanQuiz, RenderScanQuizDoc } from './renderscan/models/renderscan_quiz.model'
import { RenderScanResults, RenderScanResultDoc } from './renderscan/models/renderscan_results.model'
import { RenderScanContest, RenderScanContestDoc } from './renderscan/models/renderscan_contest.model'
import { RenderScanGameType, RenderScanGameTypeDoc } from './renderscan/models/renderscan_game_type.modal'
import { RenderScanQuizQuestion, RenderScanQuizQuestionDoc } from './renderscan/models/renderscan_quiz_question.model'
import { RenderScanContestant, RenderScanContestantDoc, RenderScanContestantType } from './renderscan/models/renderscan_contestant.model'
import { RenderScanContestTypeState, RenderScanContestTypeStateDoc, RenderScanContestTypeStateType } from './renderscan/models/renderscan_contest_type_state.model'
import { RenderScanGameState, RenderScanGameStateDoc, RenderScanGameStateType } from './renderscan/models/renderscan_game_state.model'

import { MONGO_DB_URL } from '../../config'

mongoose
	.connect(MONGO_DB_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, })
	.then(() => logger.info("🚀  Database connection initialized..."))
	.catch((err) => logger.error("👉  Database connection failed... " + err))

mongoose.connection
	.on('open', () => logger.info('🚀  Database connected Successfully'))
	.on('error', (err) => logger.error("👉  Error" + err))
	.on('disconnected', () => logger.warn('🚨  Database disconnected...'));

export const db = {
	mongoose,
	// email db
	RenderverseEmails,

	// User Modals
	User, UserWallet,

	// Rendle Models
	RendleWord, RendleResult, RendleContest, RendleGameType, RendleGameState,
	RendleContestant,

	// Renderscan Models
	RenderScan, RenderScanQuiz, RenderScanContest, RenderScanResults,
	RenderScanGameType, RenderScanQuizQuestion, RenderScanContestant,
	RenderScanContestTypeState, RenderScanGameState
}

export {
	// User Types
	UserType, UserWalletType,

	// Rendle Types
	RendleWordType, RendleResultType, RendleContestType, RendleGameTypeType,
	RendleContestantType, RendleGameStateType,

	// Renderscan Types
	RenderScanContestantType, RenderScanContestTypeStateType,
	RenderScanGameStateType
}

export {
	// Renderverse Emails
	RenderverseEmailsDocument,

	// User Docs
	UserDocument, UserWalletDocument,

	// Rendle Docs
	RendleResultsDocument, RendleContestDocument, RendleGameTypeDocument,
	RendleGameStateDocument, RendleWordDocument, RendleContestantDocument,

	// Renderscan Docs 
	RenderScanDoc, RenderScanQuizDoc, RenderScanResultDoc, RenderScanContestDoc,
	RenderScanGameTypeDoc, RenderScanQuizQuestionDoc, RenderScanContestantDoc,
	RenderScanContestTypeStateDoc, RenderScanGameStateDoc
}
