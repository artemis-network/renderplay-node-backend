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

}

export {
	// User Types
	UserType, UserWalletType,

	// Rendle Types
	RendleWordType, RendleResultType, RendleContestType, RendleGameTypeType,
	RendleContestantType, RendleGameStateType
}

export {
	// Renderverse Emails
	RenderverseEmailsDocument,

	// User Docs
	UserDocument, UserWalletDocument,

	// Rendle Docs
	RendleResultsDocument, RendleContestDocument, RendleGameTypeDocument,
	RendleGameStateDocument, RendleWordDocument, RendleContestantDocument
}
