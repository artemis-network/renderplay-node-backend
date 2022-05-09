import moment from 'moment'

interface RendleGameType {
	gameType: number,
	isExpired: Boolean,
	startsOn?: any,
	entryFee: number
}

function getCurrentIndianDateTime() {
	var time = moment.utc().format()
	return new Date(time);
}

const date = getCurrentIndianDateTime();
const numOfHours = 4;
date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);


console.log(">> Time " + getCurrentIndianDateTime())
console.log(">> Time " + date)

const rendleGameTypes: Array<RendleGameType> = [
	{
		gameType: 5,
		startsOn: getCurrentIndianDateTime(),
		isExpired: false,
		entryFee: 1000
	},
	{
		gameType: 6,
		startsOn: date,
		isExpired: false,
		entryFee: 1500
	},
	{
		gameType: 7,
		startsOn: null,
		isExpired: true,
		entryFee: 2000
	},
]

export { rendleGameTypes, RendleGameType }