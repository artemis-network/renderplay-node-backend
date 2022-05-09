import { db } from "../../models/db"

const { User, UserWallet } = db

interface Result {
	error?: boolean,
	message?: string;
	balance?: number;
}

const getWallet = async (username: string) => {
	try {
		const user = await User.findOne({ username: username });
		if (!user?.$isEmpty) {
			const wallet = await UserWallet.findOne({ user: user?._id })
			if (!wallet?.$isEmpty) {
				const result: Result = {
					error: false,
					message: "SUCCESS",
					balance: wallet?.balance,
				}
				return result;
			}
			const result: Result = {
				error: true,
				message: "Wallet does not exists"
			}
			return result
		}
	} catch (e) {
		throw new Error()
	}
}

const depositFunds = async (username: string, amount: number) => {
	try {
		const user = await User.findOne({ username: username });
		if (!user?.$isEmpty) {
			const wallet = await UserWallet.findOne({ user: user?._id });
			await wallet?.update({
				$set: {
					balance: (wallet?.balance + amount)
				}
			})
			await wallet?.save()
			return { message: "Funds Added!", balance: wallet?.balance }
		}
	} catch (e) {
		throw new Error("")
	}
}

export {
	getWallet,
	depositFunds
}