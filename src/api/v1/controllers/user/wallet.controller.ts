import { Request, Response } from 'express'
import { getWallet, depositFunds } from '../../services/user/wallet.service'

const getWalletController = async (req: Request, res: Response) => {
	try {
		const { username } = req.body
		const result = await getWallet(username)
		return res.status(200).json(result)
	} catch (e) {
		return res.status(200).json(e)
	}
}

const depositFundsController = async (req: Request, res: Response) => {
	try {
		const { username, amount, password } = req.body
		if (password === "password@1234") {
			const result = await depositFunds(username, amount);
			return res.status(200).json(result)
		}
		return res.status(200).json({ message: "invalid password", error: true })
	} catch (e) {
		return res.status(200).json(e)
	}
}

export {
	getWalletController,
	depositFundsController
}