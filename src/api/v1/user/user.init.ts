import { db } from '../db'
import { UserServices } from '../user/services/user.service'
import { depositFunds } from '../user/services/wallet.service';
import { logger } from '../utils/logger';

const { User } = db

import { ADMIN } from '../../../config'

const initUser = async () => {
	try {
		const deposit: number = 1000000
		const users = await (await User.find()).length
		if (users <= 0) {
			logger.info(">> create admin user")
			const user: any = await UserServices.createUser(ADMIN.username, ADMIN.email, ADMIN.password, false)
			const newUser = await User.findOne({ username: ADMIN.username })
			const details = await depositFunds(newUser?._id, deposit)
			console.log(details)
			logger.info(">> successfully admin user")
		}
		return { message: "ok" }
	} catch (e) {
		return { message: e };
	}
}

export { initUser };