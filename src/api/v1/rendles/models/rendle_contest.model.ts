import mongoose, { Schema, Model, Document } from 'mongoose';

type RendleContestDocument = Document & {
	minimumContestants: number;
	prizePool: number;
	startsOn?: Date;
	isExpired: Boolean,
	isVisible: Boolean,
	contestants: string[],
	gameType: string
	entryFee: number,
	opensAt?: Date,
	expiresAt?: Date
};

const rendleContestSchema = new Schema(
	{
		minimumContestants: {
			type: Schema.Types.Number,
			required: true,
		},
		startsOn: {
			type: Schema.Types.Date,
			required: false
		},
		opensAt: {
			type: Schema.Types.Date,
			required: false
		},
		expiresAt: {
			type: Schema.Types.Date,
			required: false
		},
		isExpired: {
			type: Schema.Types.Boolean,
			required: true
		},
		isVisible: {
			type: Schema.Types.Boolean,
			required: true
		},
		prizePool: {
			type: Schema.Types.Number,
			required: true,
			default: 0
		},
		entryFee: {
			type: Schema.Types.Number,
			required: true,
			default: 0
		},
		gameType: {
			type: Schema.Types.ObjectId,
			ref: 'Rendle_Game_Type',
			requried: false,
		},
		contestants: [{ type: Schema.Types.ObjectId, ref: 'User' }]
	},
);


const RendleContest: Model<RendleContestDocument> = mongoose.model<RendleContestDocument>('Rendle_Contest', rendleContestSchema);

export { RendleContest, RendleContestDocument };