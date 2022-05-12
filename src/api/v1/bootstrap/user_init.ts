import { db } from '../models/db'
import { createUser } from '../services/user/user.service'
import { depositFunds } from '../services/user/wallet.service';
import { logger } from '../utils/logger';

const { User } = db

import { ADMIN } from '../../../config'

const initUser = async () => {
	try {
		const deposit: number = 1000000
		logger.info(">> checking for user collection")
		const users = await (await User.find()).length
		if (users <= 0) {
			logger.info(">> create initial user")
			const user: any = await createUser(ADMIN.username, ADMIN.email, ADMIN.password)
			const newUser = await User.findOne({ username: ADMIN.username })
			const details = await depositFunds(newUser?._id, deposit)
			console.log(details)
			logger.info(">> successfully created user")
		}
	} catch (e) {
		return e;
	}
}

export { initUser };
