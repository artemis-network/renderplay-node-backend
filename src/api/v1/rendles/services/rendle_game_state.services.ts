import { db } from '../../db'
import { fiveLetterList } from '../config/fiveLetterList'
import { sixLetterList } from '../config/sixLetterList'
import { sevenLetterList } from '../config/sevenLetterList'
import { fiveLetterGuesses } from '../config/fiveLetterGuesses'
import { sixLetterGuesses } from '../config/sixLetterGuesses'
import { sevenLetterGuesses } from '../config/sevenLetterGuesses'


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

	static getGameTypeFromContest = async (contestId: string) => {
		const contest:any = await RendleContest.findById(contestId).populate("gameType")
		return { gameType: contest?.gameType.gameType}
	}

	static getAnswerForTheContest = async (contestId: string) => {
		const gameType = await this.getGameTypeFromContest(contestId)
		
	}

	// static validateGuessesFromWordsList = async (word: string, gameType: string, answer: string) => {
	// 	if (gameType == '5' && fiveLetterGuesses.indexOf(word.toLocaleLowerCase()) > -1){
			
	// 	}
	// 	else if (gameType == '6' && sixLetterGuesses.indexOf(word.toLocaleLowerCase()) > -1){

	// 	}
	// 	else if (gameType == '7' && sevenLetterGuesses.indexOf(word.toLocaleLowerCase()) > -1){
			
	// 	}
	// 	else{

	// 	}
	}
}
