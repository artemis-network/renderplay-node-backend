import mongoose, { Schema, Model, Document } from 'mongoose';

export type RendleResultType = {
	gameType: number; contest: string; startedOn: Date,
	completedOn: Date, chances: number, isWon: Boolean, contestant: string;
}

export type RendleResultsDocument = Document & RendleResultType;

const rendleResultsSchema = new Schema({
	gameType: { type: Schema.Types.Number, required: true, },
	contest: { type: Schema.Types.ObjectId, ref: 'Rendle_Contest', required: true },
	completedIn: { type: Schema.Types.Number, required: true },
	completedOn: { type: Schema.Types.Date, required: true, },
	chances: { type: Schema.Types.Number, required: true, },
	isWon: { type: Schema.Types.Boolean, required: true, },
	contestant: { type: Schema.Types.ObjectId, ref: 'Rendle_Contestant' },
	rendleWords: [{ type: Schema.Types.ObjectId, ref: 'Rendle_Word' }]
},
);


export const RendleResult: Model<RendleResultsDocument> = mongoose
	.model<RendleResultsDocument>('Rendle_Result', rendleResultsSchema);
