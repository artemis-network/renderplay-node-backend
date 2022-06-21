import { db, RendleContestantType } from '../../db'
import rand from 'random-seed'
import { DBObject } from '../../db_object'
import { fiveLetterList } from '../config/fiveLetterList'
import { sixLetterList } from '../config/sixLetterList'
import { sevenLetterList } from '../config/sevenLetterList'
import { fiveLetterGuesses } from '../config/fiveLetterGuesses'
import { sixLetterGuesses } from '../config/sixLetterGuesses'
import { sevenLetterGuesses } from '../config/sevenLetterGuesses'
import { RendleGameState } from '../models/rendle_game_state.model'
import { rendleImages } from '../data/rendleImageUrls'

const { RendleContest, RendleResult, RendleContestant } = db;

export class RendleContestServices {


	static getContests = async () => {
		try {
			const query: any = await RendleContest
				.find().where({ isVisible: true }).populate("gameType").sort({ gameType: 1 })
				.exec();
			const object = new DBObject(query)
			const rendles = object.get();

			const serializedRendles = []
			for (let i = 0; i < rendles.length; i++) {
				const id = rendles[i]._id
				const gameType = rendles[i].gameType?.gameType;
				const startsOn = rendles[i].startsOn;
				const entryFee = rendles[i].entryFee
				const expiresAt = rendles[i].expiresAt
				const isExpired = rendles[i].isExpired
				const images = rendleImages[i]
				serializedRendles.push({
					_id: id, gameType: gameType, startsOn: startsOn, entryFee: entryFee,
					expiresAt: expiresAt, isExpired: isExpired, rendleImages: images
				})
			}
			return { currentTime: new Date(), rendleContests: serializedRendles }
		} catch (error) {
			console.log(error)
		}

	}

	static doesUserAlreadyInContest = async (userId: string, contestId: string) => {
		const contest = await RendleContest.findById(contestId).populate("contestants")
		const contestants: any = contest?.contestants ?? [];
		for (let i = 0; i < contestants.length; i++) {
			const isInContest: boolean = String(contestants[i].user) === String(userId);
			if (isInContest) return true
		}
		return false
	}

	static getGameTypeFromContest = async (contestId: string) => {
		const contest: any = await RendleContest.findById(contestId).populate("gameType")
		return { gameType: contest?.gameType.gameType }
	}

	static isContestOpened = async (contestId: string) => {
		const contest: any = await RendleContest.findById(contestId)
		const constestTime = new Date(contest?.startsOn).getTime()
		const now = new Date().getTime()
		const isContestOpened = now - constestTime
		if (isContestOpened > 0) return true
		return false
	}
	static isLobbyClosed = async (contestId: string) => {
		const contest: any = await RendleContest.findById(contestId)
		const lobbyTime = new Date(contest?.opensAt).getTime()
		const now = new Date().getTime()
		const isLobbyExpired = lobbyTime - now
		if (isLobbyExpired > 0) return false
		return true
	}

	static getContestEntryFee = async (id: number) => {
		const contest = await RendleContest.findById(id);
		return contest?.entryFee || 0
	}

	static createContestant = async (contestant: RendleContestantType) =>
		await RendleContestant.create(contestant)


	static getContestant = async (userId: string, contestId: string) =>
		await RendleContestant.findOne({ contest: contestId }).where({ user: userId })


	static addUserToContest = async (
		userId: string, contestId: string, walletAddress: string, entryFee: number
	) => {
		const contest = await RendleContest.findById(contestId);
		const contestant = await this.createContestant({
			user: userId, contest: contestId, walletAddress: walletAddress
		})
		await contest?.updateOne({
			$set: {
				contestants: ([...contest?.contestants, contestant]),
				prizePool: (contest?.prizePool + entryFee)
			}
		})
		await contest?.save()
	}

	static saveContestResult = async (
		gameType: number, contestId: string, contestant: string,
		completedIn: number, chances: number, isWon: boolean, words: any
	) => {
		try {
			await RendleResult.create({
				contestant: contestant, gameType: gameType, chances: chances,
				completedIn: completedIn, isWon: isWon, completedOn: new Date(),
				contest: contestId, rendleWords: words
			})
		} catch (e) {
			console.log(e)
		}
	}

	static doesUserHaveGameState = async (userId: string, contestId: string) => {
		const gameStateId = await RendleGameState
			.findOne({ userId: userId }).where({ contestId: contestId })
		if (gameStateId !== null) {
			return true;
		}
		return false;

	}

	static doesUserFinishedGame = async (userId: string, contestId: string) => {
		try {
			const contestant = await RendleContestant
				.findOne({ user: userId }).where({ contest: contestId })

			const result = await RendleResult.findOne({ contestant: contestant?._id })
			if (result !== null) {
				if (result)
					return {
						id: result?._id,
						startsOn: result?.startedOn,
						completedOn: result?.completedOn,
						isWon: result.isWon,
						contest: result.contest,
						isGameCompleted: true
					}
			} return null
		} catch (err) {
			return null
		}
	}

	static calculateOpensAtTime = (opensAt: Date) => {
		const now = new Date().getTime()
		const time = new Date(opensAt).getTime()
		return (time - now) < 0
	}

	static doesUserPlayingContest = async (userId: string, contestId: string) => {
		const contest = await RendleContest.findById(contestId).populate("contestants")
		const contestants: any = contest?.contestants ?? [];
		for (let i = 0; i < contestants.length; i++) {
			console.log(contestants, userId)
			const isPlaying: boolean = String(contestants[i].user) === String(userId);
			if (isPlaying) return true
		}
		return false
	}

	static getExpiryTime = async (contestId: string) => {
		const contest = await RendleContest.findById(contestId)
		return { expiresAt: contest?.expiresAt, opensAt: contest?.opensAt }
	}

	static getWinningWord = async (contestId: string, gameType: number) => {
		var gen = rand.create(contestId)
		if (gameType == 5) {
			var n = gen(fiveLetterList.length)
			return fiveLetterList[n]
		}
		else if (gameType == 6) {
			var n = gen(sixLetterList.length)
			return sixLetterList[n]
		}
		else if (gameType == 7) {
			var n = gen(sevenLetterList.length)
			return sevenLetterList[n]
		}
	}


	static isWordPresentInValidGuessList = async (gameType: number, guess: string) => {
		console.log("guess - " + guess)
		if (gameType == 5 && fiveLetterGuesses.indexOf(guess.toLowerCase()) > -1) {
			return true;
		}
		else if (gameType == 6 && sixLetterGuesses.indexOf(guess.toLowerCase()) > -1) {
			return true;
		}
		else if (gameType == 7 && sevenLetterGuesses.indexOf(guess.toLowerCase()) > -1) {
			return true;
		}
		else {
			return false;
		}
	}

	static getGuessStatuses = async (gameType: number, contestId: string, guess: string) => {
		const solution: any = await this.getWinningWord(contestId, gameType)
		const guessStatus = []
		var isWinningWord: boolean = true
		console.log("solution - " + solution)
		for (let i = 0; i < guess.length; i++) {
			if (guess[i].toLowerCase() === solution[i]) {
				console.log('yes')
				guessStatus.push("correct")
			} else {
				console.log('no')
				isWinningWord = false;
				guessStatus.push(await this.isLetterInWord(solution, guess[i]))
			}
		}
		return { guessStatus: guessStatus, isWinningWord: isWinningWord }
	}

	static isLetterInWord(solution: string, letter: string) {
		for (let i = 0; i < solution.length; i++)
			if (solution[i] === letter.toLowerCase()) return "present"
		return "absent"
	}


}
