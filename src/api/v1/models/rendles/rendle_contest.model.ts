import mongoose, { Schema, Model, Document } from 'mongoose';
import { UserDocument } from '../user.model'

type RendleContestDocument = Document & {
	minimumContestants: number;
	prizePool: number;
	contestants: Array<UserDocument>
};

const rendleContestSchema = new Schema(
	{
		minimumContestants: {
			type: Schema.Types.Number,
			required: true,
		},
		prizePool: {
			type: Schema.Types.Number,
			required: true,
			default: 0
		},
		contestants: [{ type: Schema.Types.ObjectId, ref: 'RendleContestant' }]
	},
);


const RendleContest: Model<RendleContestDocument> = mongoose.model<RendleContestDocument>('RendleContest', rendleContestSchema);

export { RendleContest, RendleContestDocument };