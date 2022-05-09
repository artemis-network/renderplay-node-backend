import moment from 'moment'

enum RenderScanGameType {
	FREE, PAID
}

interface RenderScanGameTypes {
	gameType: RenderScanGameType;
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
		gameType: RenderScanGameType.FREE,
		startsOn: getCurrentIndianDateTime(),
		isExpired: false,
		entryFee: 1000
	},
	{
		gameType: RenderScanGameType.PAID,
		startsOn: date,
		isExpired: false,
		entryFee: 1500
	},

]

export { renderscanGameTypes }