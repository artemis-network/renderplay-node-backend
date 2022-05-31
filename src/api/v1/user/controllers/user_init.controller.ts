import { Request, Response } from 'express';
import { initUser } from '../user.init'

export const userInitController = async (req: Request, res: Response) => {
	await initUser()
}