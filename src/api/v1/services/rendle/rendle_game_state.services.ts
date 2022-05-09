import { db, WordsDocument, RendleGameStateDocument } from '../../models/db'


const { RendleGameState, User, Words } = db;
import { logger } from '../../utils/logger';

type RendleGameStateInput = {
	user: RendleGameStateDocument['user'];
	words: RendleGameStateDocument['words']
};
type WordsInputs = {
	guess: WordsDocument['guess']
}


const updateCurrentGuesses = async (username: string, word: string, gameStateId: string) => {
	try {
		const user = await User.findOne({ username: username })
		const wordInput: WordsInputs = { guess: word }
		const newWord = await Words.create(wordInput)
		if (gameStateId === null) {
			const wordsList = []
			wordsList.push(newWord)
			const input: RendleGameStateInput = {
				user: user?._id,
				words: wordsList
			}
			await RendleGameState.create(input)
			return { message: "Successfully created new guess" }
		} else {
			const gameState = await RendleGameState.findById(gameStateId)
			await gameState?.updateOne({
				$set: {
					words: [...gameState?.words, newWord]
				}
			})
			return { message: "Successfully updated guess" }
		}
	} catch (error) {
		return { message: `Something went wrong ${error}` }
	}
}


const getRendleCurrentGuesses = async (username: string) => {
	try {
		const user = await User.findOne({ username: username })
		const gameState = await RendleGameState.findOne({ user: user?._id })
		return { gameState: gameState };
	} catch (error) {
		return { message: `Something went wrong ${error}` }
	}
}


export {
	updateCurrentGuesses,
	getRendleCurrentGuesses
}