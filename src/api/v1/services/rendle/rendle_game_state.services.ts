import { db, RendleGameStateDocument, RendleWordDocument } from '../../models/db'
const { RendleGameState, RendleWord } = db;

type RendleGameStateInput = {
	userId: RendleGameStateDocument['userId'];
	contestId: RendleGameStateDocument['contestId']
	words: RendleGameStateDocument['words']
};

const updateCurrentGuesses = async (userId: string, contestId: string, word: string, gameStateId: string) => {
	try {
		const rendleWord = await RendleWord.create({ guess: word })
		const gameState = await RendleGameState.findOne({ userId: userId })
		if (gameState !== null) {
			await gameState?.updateOne({
				$set: {
					words: [...gameState.words, rendleWord]
				}
			})
			await gameState?.save()
			return { message: "Successfully updated guess", gameStateId: gameState?._id }
		} else {
			const wordList = [];
			wordList.push(rendleWord)
			const input: RendleGameStateInput = {
				contestId: contestId,
				userId: userId,
				words: wordList
			}
			const { _id } = await RendleGameState.create(input)
			return { message: "Successfully created new guess", gameStateId: _id }
		}
	} catch (error) {
		console.log(error)
		return { message: `Something went wrong ${error}` }
	}
}


const getRendleCurrentGuesses = async (userId: string) => {
	try {
		const gameState: any = await RendleGameState.findOne({ userId: userId }).populate('words').exec()
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

export {
	updateCurrentGuesses,
	getRendleCurrentGuesses
}