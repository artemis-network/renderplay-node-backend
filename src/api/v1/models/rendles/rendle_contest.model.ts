import mongoose, { Schema, Model, Document } from 'mongoose';
import { UserDocument } from '../user.model'

type RendleContestDocument = Document & {
	minimumContestants: number;
	prizePool: number;
	startsOn?: Date;
	isExpired: Boolean,
	isVisible: Boolean,
	contestants: string[],
	gameType: string
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
		gameType: {
			type: Schema.Types.String,
			requried: false,
		},
		contestants: [{ type: Schema.Types.ObjectId, ref: 'User' }]
	},
);


const RendleContest: Model<RendleContestDocument> = mongoose.model<RendleContestDocument>('RendleContest', rendleContestSchema);

export { RendleContest, RendleContestDocument };