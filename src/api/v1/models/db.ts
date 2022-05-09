import mongoose from 'mongoose';

import { logger } from '../utils/logger';

import { User, UserDocument } from './user.model'
import { UserWallet, UserWalletDocument } from './wallet.model'
import { RendleGameType, RendleGameTypeDocument, } from './rendle_game_type.model'
import { RendleContest, RendleContestDocument } from './rendle_contest.model'
import { RendleResult, RendleResultsDocument, } from './rendle_results.model'
import { RenderverseEmails, RenderverseEmailsDocument, } from './rendervers_emails.model'
import { RendleGameState, RendleGameStateDocument, Words, WordsDocument, } from './rendle_game_state.model'

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
	User,
	Words,
	UserWallet,
	RendleResult,
	RendleContest,
	RendleGameType,
	RendleGameState,
	RenderverseEmails,
}

export {
	db,
	UserDocument,
	WordsDocument,
	UserWalletDocument,
	RendleResultsDocument,
	RendleContestDocument,
	RendleGameTypeDocument,
	RendleGameStateDocument,
	RenderverseEmailsDocument
}