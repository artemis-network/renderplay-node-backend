import { db } from '../../models/db'
import { RenderScanRefWord } from '../../models/renderscan/renderscan_ref_word.modal';

const {
	RenderScanContest,
	RenderScanGameType,
} = db

export const resetRenderScanGames = async (word: string, image: string, type: string) => {
	try {
		const gameType = await RenderScanGameType.findOne({ gameType: type })
		const refWord = await RenderScanRefWord.create({
			word: word,
			image: image
		})
		const contest = await RenderScanContest.create({
			prizePool: 0,
			minimumContestants: 10,
			contestants: [],
			refWord: refWord
		});
		await gameType?.updateOne({
			$set: {
				contestId: contest?._id,
				startsOn: Date.now()
			}
		});
		await gameType?.save();
		return { message: `reset successful, ${type}` }
	} catch (e) {
		return { message: e }
	}
}