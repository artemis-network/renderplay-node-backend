import moment from 'moment'

interface RenderScanGameTypes {
	gameType: string;
	startsOn?: Date;
	isExpired: Boolean,
	entryFee: number,
}

function getCurrentIndianDateTime() {
	var time = moment.utc().format()
	return new Date(time);
}

const date = getCurrentIndianDateTime();
const numOfHours = 4;
date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

const renderscanGameTypes: RenderScanGameTypes[] = [
	{
		gameType: "FREE",
		startsOn: getCurrentIndianDateTime(),
		isExpired: false,
		entryFee: 1000
	},
	{
		gameType: "PAID",
		startsOn: date,
		isExpired: false,
		entryFee: 1500
	},

]

export { renderscanGameTypes, RenderScanGameTypes }