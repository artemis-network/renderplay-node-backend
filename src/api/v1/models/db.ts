import mongoose from 'mongoose';

import { logger } from '../utils/logger';

import { User, UserDocument } from './user.model'
import { UserWallet, UserWalletDocument } from './wallet.model'
import { RendleGameType, RendleGameTypeDocument, } from './rendle_game_type.model'
import { RendleContest, RendleContestDocument } from './rendle_contest.model'
import { RendleResult, RendleResultsDocument, } from './rendle_results.model'
import { RenderverseEmails, RenderverseEmailsDocument, } from './rendervers_emails.model'
import { RendleGameState, RendleGameStateDocument, Words, WordsDocument, } from './rendle_game_state.model'

import { RenderScan, RenderScanDocument } from './renderscan.model'
import { RenderScanContest, RenderScanContestDocument } from './renderscan_contests.model'
import { RenderScanGameType, RenderScanGameTypeDocument } from './renderscan_game_type.modal'
import { RenderScanRefWord, RenderScanRefWordDocument } from './renderscan_ref_word.modal'
import { RenderScanResults, RenderScanResultsDocument } from './renderscan_results'

mongoose
	.connect
	(
		'mongodb://artemisnetwork:Artemis%40123@3.108.106.111:27017/renderverse?authMechanism=DEFAULT',
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
	.on('disconnected', () => console.warn('🚨  Database disconnected...'));

const db = {
	mongoose,

	// User Modals
	User,
	UserWallet,

	// Rendle Models
	Words,
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

	// User Docs
	UserDocument,
	UserWalletDocument,

	// Rendle Docs
	WordsDocument,
	RendleResultsDocument,
	RendleContestDocument,
	RendleGameTypeDocument,
	RendleGameStateDocument,
	RenderverseEmailsDocument,

	// Renderscan Docs
	RenderScanDocument,
	RenderScanContestDocument,
	RenderScanGameTypeDocument,
	RenderScanResultsDocument,
	RenderScanRefWordDocument
}