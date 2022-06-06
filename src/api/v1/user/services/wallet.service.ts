import { db } from "../../db"
import { logger } from "../../utils/logger";
const { UserWallet } = db

interface Result { error?: boolean, message?: string; balance?: number; }

export const getWallet = async (userId: string): Promise<Result> => {
	const wallet = await UserWallet.findOne({ user: userId })
	return { error: false, message: "ok", balance: wallet?.balance }
}

export const depositFunds = async (userId: string, amount: number): Promise<Result> => {
	const wallet = await UserWallet.findOne({ user: userId });
	logger.info(`>> depositing ${amount} funds to ${userId}`)
	await wallet?.updateOne({ $set: { balance: (wallet?.balance + amount) } })
	await wallet?.save()
	return { error: false, message: "ok", balance: wallet?.balance }
}

export const getBalance = async (userId: string) => {
	const wallet = await UserWallet.findOne({ user: userId });
	return wallet?.balance || 0;
}

export const deductFunds = async (userId: string, amount: number): Promise<Result> => {
	const wallet: any = await UserWallet.findOne({ user: userId });
	const currentBalance = await wallet?.balance || 0;
	await wallet?.updateOne({ $set: { balance: currentBalance - amount } })
	await wallet?.save()
	return { error: false, message: "ok", balance: wallet?.balance }
}