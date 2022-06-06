import { Request, Response } from 'express'
import { getWallet, depositFunds } from '../services/wallet.service'

export const getWalletController = async (req: Request, res: Response) => {
	const { userId } = req.body
	const result = await getWallet(userId)
	return res.status(200).json(result)
}

export const depositFundsController = async (req: Request, res: Response) => {
	const { userId, amount, password } = req.body
	if (password === "password@1234") {
		const result = await depositFunds(userId, amount);
		return res.status(200).json(result)
	}
	return res.status(200).json({ message: "invalid password", error: true })
}