import { Request, Response } from 'express';
import { initializeRendleGames } from '../rendle.init'

export const rendlesInit = async (req: Request, res: Response) => {
	await initializeRendleGames()
	return res.status(200).json({ message: "ok" })
}