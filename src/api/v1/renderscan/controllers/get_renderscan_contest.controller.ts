import { Request, Response } from 'express'
import { getRenderScanTypeState, getRenderScanContests, getRenderScanGameTypes, getRenderScanContestIsLobbyClosed } from '../services/renderscan.services'

// @desc getting renderscans
// @api /backend/v1/renderscan
// @access public
export const getRenderScanContestsController = async (req: Request, res: Response) => {
	const renderscans: any = await getRenderScanContests()
	const gameTypesState = ["[FREE]", "[PAID]", "[PAID]"]
	const categoryState = ["[SPORTS]", "[GEOGRAPHY]", "[GENERAL]", "[ANIMALS]", "[CELEBRITY]"]

	const modRenderscanList = [];
	for (let i = 0; i < renderscans.length; i++) {
		const isLobbyClosed = await getRenderScanContestIsLobbyClosed(renderscans[i].startsOn)
		const response = {
			_id: renderscans[i]._id, startsOn: renderscans[i].startsOn,
			entryFee: renderscans[i].entryFee, gameType: renderscans[i].gameType.gameType,
			category: renderscans[i].gameType.category, upComing: false, isClosed: isLobbyClosed
		}
		modRenderscanList.push(response)
	}

	let { categoryTypeCounter, gameTypeCounter }: any = await getRenderScanTypeState()

	for (let i = 1; i <= 2; i++) {

		gameTypeCounter += 1
		categoryTypeCounter += 1

		if (gameTypeCounter >= 3) gameTypeCounter = 0
		if (categoryTypeCounter >= 5) categoryTypeCounter = 0

		const gameType = await getRenderScanGameTypes(gameTypesState[gameTypeCounter], categoryState[categoryTypeCounter])
		const response = {
			_id: gameType?._id, entryFee: gameType?.entryFee,
			gameType: gameType?.gameType, category: gameType?.category,
			upComing: true, isClosed: false
		}
		modRenderscanList.push(response)
	}


	return res.status(200).json({ renderscanContests: modRenderscanList })
}