import mongoose from 'mongoose';

import { logger } from '../utils/logger';

import { User, UserDocument } from './user.model'
import { UserWallet, UserWalletDocument } from './wallet.model'

import { RenderverseEmails, RenderverseEmailsDocument, } from './rendervers_emails.model'

import { RendleWord, RendleWordDocument, } from './rendles/rendle_word.model'
import { RendleContest, RendleContestDocument } from './rendles/rendle_contest.model'
import { RendleResult, RendleResultsDocument, } from './rendles/rendle_results.model'
import { RendleGameType, RendleGameTypeDocument, } from './rendles/rendle_game_type.model'
import { RendleGameState, RendleGameStateDocument, } from './rendles/rendle_game_state.model'

import { RenderScan, RenderScanDocument } from './renderscan/renderscan.model'
import { RenderScanRefWord, RenderScanRefWordDocument } from './renderscan/renderscan_ref_word.modal'
import { RenderScanResults, RenderScanResultsDocument } from './renderscan/renderscan_results'
import { RenderScanContest, RenderScanContestDocument } from './renderscan/renderscan_contests.model'
import { RenderScanGameType, RenderScanGameTypeDocument } from './renderscan/renderscan_game_type.modal'

import { MONGO_DB_URL } from '../../../config'

mongoose
	.connect
	(
		MONGO_DB_URL,
		{
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => logger.info("🚀  Database connection initialized..."))
	.catch((err) => logger.error("👉  Database connection failed... " + err))

mongoose
	.connection
	.on('open', () => logger.info('🚀  Database connected Successfully'))
	.on('error', (err) => logger.error("👉  Error" + err))
	.on('disconnected', () => logger.warn('🚨  Database disconnected...'));

const db = {
	mongoose,

	// User Modals
	User,
	UserWallet,

	// Rendle Models
	RendleWord,
	RendleResult,
	RendleContest,
	RendleGameType,
	RendleGameState,
	RenderverseEmails,

	// Renderscan models
	RenderScan,
	RenderScanResults,
	RenderScanContest,
	RenderScanRefWord,
	RenderScanGameType,
}

export {
	db,
	// Renderverse Emails
	RenderverseEmailsDocument,

	// User Docs
	UserDocument,
	UserWalletDocument,

	// Rendle Docs
	RendleResultsDocument,
	RendleContestDocument,
	RendleGameTypeDocument,
	RendleGameStateDocument,
	RendleWordDocument,

	// Renderscan Docs
	RenderScanDocument,
	RenderScanContestDocument,
	RenderScanGameTypeDocument,
	RenderScanResultsDocument,
	RenderScanRefWordDocument
}