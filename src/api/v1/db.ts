import mongoose from 'mongoose';

import { logger } from './utils/logger';

import { User, UserDocument } from './user/models/user.model'
import { UserWallet, UserWalletDocument } from './user/models/wallet.model'

import { RenderverseEmails, RenderverseEmailsDocument, } from './user/models/rendervers_emails.model'

import { RendleWord, RendleWordDocument, } from './rendles/models/rendle_word.model'
import { RendleContest, RendleContestDocument } from './rendles/models/rendle_contest.model'
import { RendleResult, RendleResultsDocument, } from './rendles/models/rendle_result.model'
import { RendleGameType, RendleGameTypeDocument, } from './rendles/models/rendle_game_type.model'
import { RendleGameState, RendleGameStateDocument, } from './rendles/models/rendle_game_state.model'


import { MONGO_DB_URL } from '../../config'

mongoose.connect(MONGO_DB_URL, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => logger.info("🚀  Database connection initialized..."))
	.catch((err) => logger.error("👉  Database connection failed... " + err))

mongoose.connection
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

}