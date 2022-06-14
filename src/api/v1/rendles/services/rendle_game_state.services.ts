import { db } from '../../db'
const { RendleGameState, RendleWord } = db;


export class RendleGameStateServices {

	static createGameStateForUser = async (userId: string, contestId: string) => {
		try {
			const gameState = await RendleGameState.create({
				userId: userId,
				contestId: contestId,
				words: [],
			});
			return { gameStateId: gameState?._id }
		} catch (error) {
			return { gameStateId: null }
		}
	}

	static getGameStateIdByUserId = async (userId: string) => {
		return await RendleGameState.findOne({ userId: userId }).populate("words").exec()
	}

	static getWordsFromGameState = async (userId: string) => {
		try {
			const gameState = await RendleGameState
				.findOne({ userId: userId }).populate("words").exec()
			const words: any = gameState?.words
			return { words: words }
		} catch (e) {
			console.log(e)
		}
	}

	static updateGuessessListInGameStateByUserId = async (userId: string, word: string) => {
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

	static cleanGameState = async (userId: string) => await RendleGameState
		.findOneAndRemove({ userId: userId })

	static getRendleGameStateGuessessListByUserId = async (userId: string) => {
		try {
			const gameState: any = await RendleGameState
				.findOne({ userId: userId }).populate('words').exec()

			const words = await gameState?.words;
			const guesses: string[] = []
			for (let i = 0; i < words.length; i++) {
				guesses.push(await words[i].guess)
			}
			return { guesses: guesses }
		} catch (error) {
			return { message: `Something went wrong ${error}` }
		}
	}
}
