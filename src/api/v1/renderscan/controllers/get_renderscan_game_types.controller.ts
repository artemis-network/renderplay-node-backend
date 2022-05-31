import { Request, Response } from 'express'
import { renderScanDomainObjects } from '../renderscan.objects'

const { RenderScanGameType } = renderScanDomainObjects;

export const getRenderScanGameTypesController = async (req: Request, res: Response) => {
	const renderscanGameTypes = await RenderScanGameType.find()
	return res.status(200).json({ renderScanGameTypes: renderscanGameTypes })
}