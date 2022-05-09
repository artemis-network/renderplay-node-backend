import { db, RendleContestDocument } from '../../models/db'

import { logger } from '../../utils/logger';
import mongoose from 'mongoose'

const { RendleGameType, RendleContest, User, UserWallet, RendleResult } = db;

type RendleContestInput = {
	minimumContestants: RendleContestDocument['minimumContestants'];
	prizePool: RendleContestDocument['prizePool'];
};

const createRendleContest = async () => {
	try {
		const input: RendleContestInput = {
			minimumContestants: 1,
			prizePool: 0
		}
		const contest = await RendleContest.create(input)
		return contest._id;
	} catch (e) {
		logger.error(e)
	}
}


const getRendleGameTypes = async () => {
	try {
		const rendles = await RendleGameType.find();
		return { rendleGameTypes: rendles }
	} catch (e) {
		return []
	}
}

const resetRendlesGameTypes = async () => {
	try {
		// await Words.collection.drop()
		// await RendleGameState.collection.drop()
		const rendles = await RendleGameType.find().sort({ gameType: -1 })
		rendles.reverse()
		console.log(rendles)
		rendles.map(async (rendle, index) => {
			if (rendle.isExpired === true) {
				if (index === rendles.length - 1) {
					//* first game expires
					await rendles[0].updateOne({
						$set: {
							isExpired: true,
							startsOn: null,
							contestId: null,
						}
					});
					await rendles[0].save();
					//* second game goes live
					await rendles[index - 1].updateOne({
						$set: {
							isExpired: false,
							startsOn: Date.now(),
						}
					})
					await rendles[index - 1].save()
				} else if (index == 0) {
					//* expire the next game
					await rendles[index + 1].updateOne({
						$set: {
							isExpired: true,
							startsOn: null,
							contestId: null
						}
					})
					await rendles[index + 1].save()
					//* live the last game
					await rendles[index + 2].updateOne({
						$set: {
							isExpired: false,
							startsOn: Date.now()
						}
					})
					await rendles[index + 2].save();
				} else {
					// expiring next game
					await rendles[index + 1].updateOne({
						$set: {
							isExpired: true,
							startsOn: null,
							contestId: null
						}
					})
					await rendles[index + 1].save();
					// live first game
					await rendles[0].updateOne({
						$set: {
							isExpired: false,
							startsOn: Date.now()
						}
					})
					await rendles[0].save()
				}

				const rendleContest = await createRendleContest()
				const now = new Date(Date.now())
				const fourHours = 60 * 60 * 4 * 1000;

				let newTime: any = new Date(now.getTime() + fourHours).toUTCString()
				newTime = new Date(newTime)
				await rendles[index].updateOne({
					$set: {
						isExpired: false,
						contestId: rendleContest,
						startsOn: newTime,
					}
				})
				await rendles[index].save()
			}
		})
		return { message: `Reset of Rendle ${rendles[0].gameType} successful` }
	} catch (e) {
		logger.error(e)
		return { message: `Error => ${e}` }
	}
}


const enterIntoRendleContest = async (gameType: number, contestId: string, username: string, confirm: boolean) => {
	try {
		const user: any = await User.findOne({ username: username })
		const contest = await RendleContest.findById(contestId)
		const contestants = contest?.contestants;
		// contestants?.map((contestant) => {
		// 	if (contestant === user?._id) return { message: "Paid", "error": false }
		// })
		if (confirm) {
			const rendleGameType = await RendleGameType.findOne({ gameType: gameType });
			const userWallet = await UserWallet.findOne({ user: user?._id }) || null;
			if ((rendleGameType?.entryFee || 0) > (userWallet?.balance || 0)) return { message: "insufficent funds", error: true }
			contestants?.push(user);
			await contest?.updateOne({
				$set: {
					contestants: contestants,
					prizePool: contest?.prizePool + (rendleGameType?.entryFee || 0)
				}
			})
			await contest?.save()
			userWallet?.updateOne({
				balance: (userWallet?.balance - (rendleGameType?.entryFee || 0))
			})
			return { message: "success", error: false }
		}
		return { message: "user or contest does not exist", error: true }
	} catch (error) {
		logger.error("error " + error)
		return { message: `something went wrong ${error}`, error: true }
	}
}

const getRendleContestants = async (contestId: string) => {
	try {
		const rendleContestants = await RendleContest.findById(contestId)
		return { contest: rendleContestants }
	} catch (e) {
		return { contest: null }
	}
}

const saveRendleContestResult = async (
	gameType: number,
	contestId: string,
	username: string,
	chances: number,
	isWon: boolean
) => {
	try {
		const user = await User.findOne({ username: username })
		const rendle = await RendleGameType.findOne({ contestId: contestId })
		const contest = mongoose.Types.ObjectId(contestId);
		const rendleContest = await RendleContest.findById(contest);
		await RendleResult.create({
			user: user?._id,
			gameType: gameType,
			chances: chances,
			isWon: isWon,
			completedOn: Date.now(),
			startedOn: rendle?.startsOn,
			contestId: rendleContest?._id
		})
		// await RendleGameState.findOneAndRemove({ user: user?._id })
		return { message: "Successfully Posted" }
	} catch (error) {
		console.log(error)
		logger.error("👎 " + error)
		return { message: "Something went wrong" }
	}
}

const getRendleParticipants = async (contestId: string) => {
	try {
		const results = await RendleResult.find()
		const participants: any = [];
		results.map((result) => {
			const _id = String(result?.contestId)
			if (_id === contestId) participants.push(result);
		})
		return { participants: participants };
	} catch (error) {
		return []
	}
}

const getRendleGameStatus = async (username: string, contestId: string, gameType: number) => {
	try {
		const user = await User.findOne({ username: username });
	} catch (e) {
		return { message: e }
	}
}

// def get_contest_status():
//     try:
//         username = request.get_json()["username"]
//         contest_id = request.get_json()["contest_id"]
//         game_type = request.get_json()["game_type"]
//         user = User.query.filter_by(username=username).first()
//         game_result = GameResult.query.filter_by(user=user.id).all()
//         status = {}
//         for game in game_result:
//             if game.contest_id == contest_id and game.game_type == game_type:
//                 status = {
//                     "id": game.id,
//                     "game_type": game.game_type,
//                     "starts_on": game.starts_on,
//                     "completed_on": game.completed_on,
//                     "is_won": game.is_won,
//                     "contest_id": game.contest_id,
//                     "is_first_game": False
//                 }
//                 return jsonify({"status": status})

//         status = {"is_first_game": True}
//         return jsonify({"status": status})
//     except Exception as e:
//         print(e)
//     return jsonify({"message": "Internal server error"})

export {
	getRendleGameTypes,
	resetRendlesGameTypes,
	enterIntoRendleContest,
	saveRendleContestResult,
	getRendleParticipants,
	getRendleContestants,
	getRendleGameStatus
}