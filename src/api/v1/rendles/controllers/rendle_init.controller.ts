import { Request, Response } from 'express';
import { initializeRendleGames, dropRendle } from '../rendle.init'

export const rendlesInit = async (req: Request, res: Response) => {
	await initializeRendleGames()
	return res.status(200).json({ message: "ok" })
}

export const destoryRendle = async (req: Request, res: Response) => {
	await dropRendle()
	return res.status(200).json({ message: "ok" })
}