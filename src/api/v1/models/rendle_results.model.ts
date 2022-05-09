import mongoose, { Schema, Model, Document } from 'mongoose';
import { UserDocument } from './user.model'

type RendleResultsDocument = Document & {
	gameType: String;
	contestId: String;
	startedOn: Date,
	completedOn: Date,
	chances: number,
	isWon: Boolean,
	user: UserDocument
};

type RendleResultsInput = {
	gameType: RendleResultsDocument['gameType'];
	contestId: RendleResultsDocument['contestId'];
	startedOn: RendleResultsDocument['startedOn'],
	completedOn: RendleResultsDocument['completedOn'],
	chances: RendleResultsDocument['chances'],
	isWon: RendleResultsDocument['isWon'],
};

const rendleResultsSchema = new Schema(
	{
		gameType: {
			type: Schema.Types.Number,
			required: true,
		},
		contestId: {
			type: Schema.Types.ObjectId,
			ref: 'RendleContest'
		},
		startedOn: {
			type: Schema.Types.Date,
			required: true,
		},
		completedOn: {
			type: Schema.Types.Date,
			required: true,
		},
		chances: {
			type: Schema.Types.Number,
			required: true,
		},
		isWon: {
			type: Schema.Types.Boolean,
			required: true,
		},
		user: { type: Schema.Types.ObjectId, ref: 'User' }
	},
);


const RendleResult: Model<RendleResultsDocument> = mongoose.model<RendleResultsDocument>('RendleResults', rendleResultsSchema);

export { RendleResult, RendleResultsInput, RendleResultsDocument };