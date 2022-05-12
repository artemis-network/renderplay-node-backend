import { db } from "../../models/db"
const { User, UserWallet } = db

interface Result {
	error?: boolean,
	message?: string;
	balance?: number;
}

const getWallet = async (userId: string) => {
	try {
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
		const wallet = await UserWallet.findOne({ user: userId });
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