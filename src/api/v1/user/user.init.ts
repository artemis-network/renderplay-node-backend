import { db } from '../db'
import { createUser } from '../user/services/user.service'
import { depositFunds } from '../user/services/wallet.service';
import { logger } from '../utils/logger';
import { Request, Response } from 'express';

const { User } = db

import { ADMIN } from '../../../config'

const initUser = async (req: Request, res: Response) => {
	try {
		const deposit: number = 1000000
		const users = await (await User.find()).length
		if (users <= 0) {
			logger.info(">> create admin user")
			const user: any = await createUser(ADMIN.username, ADMIN.email, ADMIN.password)
			const newUser = await User.findOne({ username: ADMIN.username })
			const details = await depositFunds(newUser?._id, deposit)
			console.log(details)
			logger.info(">> successfully admin user")
		}
		return res.status(200).json({ message: "ok" })
	} catch (e) {
		return res.status(400).json({ message: e });
	}
}

export { initUser };