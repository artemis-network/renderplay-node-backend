import mongoose, { Schema, Model, Document } from 'mongoose';

type RendleResultsDocument = Document & {
	gameType: number;
	contestId: string;
	startedOn: Date,
	completedOn: Date,
	chances: number,
	isWon: Boolean,
	userId: string;
};

type RendleResultsInput = {
	gameType: RendleResultsDocument['gameType'];
	contestId: RendleResultsDocument['contestId'];
	startedOn: RendleResultsDocument['startedOn'],
	completedOn: RendleResultsDocument['completedOn'],
	chances: RendleResultsDocument['chances'],
	isWon: RendleResultsDocument['isWon'],
	userId: RendleResultsDocument['userId']
};

const rendleResultsSchema = new Schema(
	{
		gameType: {
			type: Schema.Types.Number,
			required: true,
		},
		contestId: {
			type: Schema.Types.ObjectId,
			ref: 'Rendle_Contest'
		},
		completedIn: { type: Schema.Types.Number },
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
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		rendleWords: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Rendle_Word'
			}
		]
	},
);


const RendleResult: Model<RendleResultsDocument> = mongoose.model<RendleResultsDocument>('Rendle_Result', rendleResultsSchema);

export { RendleResult, RendleResultsInput, RendleResultsDocument };