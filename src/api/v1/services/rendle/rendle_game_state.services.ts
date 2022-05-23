import { db } from '../../models/db'
const { RendleGameState, RendleWord } = db;

const createGameStateForUser = async (userId: string, contestId: string) => {
	try {
		const gameState = await RendleGameState.create({
			userId: userId,
			contestId: contestId,
			words: [],
			startedOn: new Date(Date.now())
		});
		return { gameStateId: gameState?._id }
	} catch (error) {
		return { gameStateId: null }
	}
}

const getGameStateIdByUserId = async (userId: string) => {
	return await RendleGameState.findOne({ userId: userId })
}

const updateGuessessListInGameStateByUserId = async (userId: string, word: string) => {
	try {
		const rendleWord = await RendleWord.create({ guess: word })
		const gameState = await RendleGameState.findOne({ userId: userId })
		await gameState?.updateOne({
			$set: {
				words: [...gameState.words, rendleWord]
			}
		})
		await gameState?.save()
		return { gameStateId: gameState?._id }
	} catch (error) {
		return { message: `Something went wrong ${error}` }
	}

}

const getRendleGameStateGuessessListByUserId = async (userId: string) => {
	try {
		const gameState: any = await RendleGameState.findOne({ userId: userId }).populate('words').exec()
		const words = await gameState?.words;
		const guesses: string[] = []
		for (let i = 0; i < words.length; i++) {
			guesses.push(await words[i].guess)
		}
		return { guesses: guesses, startedOn: gameState?.startedOn }
	} catch (error) {
		return { message: `Something went wrong ${error}` }
	}
}

export {
	getGameStateIdByUserId,
	createGameStateForUser,
	updateGuessessListInGameStateByUserId,
	getRendleGameStateGuessessListByUserId
}