
interface RendleGameType {
	gameType: number,
	entryFee: number
}

const rendleGameTypes: Array<RendleGameType> = [
	{
		gameType: 5,
		entryFee: 1000
	},
	{
		gameType: 6,
		entryFee: 1500
	},
	{
		gameType: 7,
		entryFee: 2000
	},
]

export { rendleGameTypes, RendleGameType }