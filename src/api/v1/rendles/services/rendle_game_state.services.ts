import { db } from '../../db'



const { RendleContest, RendleGameState, RendleWord } = db;


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

	static updateGuessessListInGameStateByUserId = async (userId: string, word: string, status: Array<string>) => {
		try {
			const rendleWord = await RendleWord.create({ guess: word, status: [...status] })
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



	static isIndexAlreadyInGameState = async (userId:string, index: number, gameType: number) => {
		const gameState: any = await RendleGameState
				.findOne({ userId: userId }).populate('words').exec()
		const len = await gameState?.words.length;
		if(index <= len){
			// wrong entry
			return true;
		}
		else{
			if(index > gameType){
				//wrong entry
				return true
			}
			//correct entry
			return false;
		}

	}
}
