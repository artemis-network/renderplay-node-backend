import { db } from "../../models/db"
import { logger } from "../../utils/logger";
const { UserWallet } = db

interface Result {
	error?: boolean,
	message?: string;
	balance?: number;
}

const getWallet = async (userId: string) => {
	try {
		logger.info(`>> fetching wallet by user id`)
		const wallet = await UserWallet.findOne({ user: userId })
		const result: Result = {
			error: false,
			message: "SUCCESS",
			balance: wallet?.balance,
		}
		return result;
	} catch (e) {
		throw new Error()
	}
}

const depositFunds = async (userId: string, amount: number) => {
	try {
		logger.info(`>> fetching wallet by user id`)
		const wallet = await UserWallet.findOne({ user: userId });
		logger.info(`>> depositing ${amount} funds to ${userId}`)
		await wallet?.updateOne({
			$set: {
				balance: (wallet?.balance + amount)
			}
		})
		await wallet?.save()
		return { message: "Funds Added!", balance: wallet?.balance }
	} catch (e) {
		console.log(e)
	}
}

export {
	getWallet,
	depositFunds
}