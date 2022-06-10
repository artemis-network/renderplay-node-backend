import { Request, Response } from 'express'
import { db } from '../../db'

const { RenderScanGameType } = db;

export const getRenderScanGameTypesController = async (req: Request, res: Response) => {
	const renderscanGameTypes = await RenderScanGameType.find()
	console.log(renderscanGameTypes)
	return res.status(200).json({ renderScanGameTypes: renderscanGameTypes })
}