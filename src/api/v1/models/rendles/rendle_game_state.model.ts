import { RendleWordDocument } from './rendle_word.model'
import mongoose, { Schema, Model, Document } from 'mongoose';

type RendleGameStateDocument = Document & {
	userId: string;
	contestId: string,
	words: Array<RendleWordDocument>,
	startedOn: Date
};

const rendleGameStateSchema = new Schema({
	userId: { type: Schema.Types.String, unique: true },
	contestId: { type: Schema.Types.String },
	words: [{ type: Schema.Types.ObjectId, ref: 'RendleWord' }],
	startedOn: { type: Schema.Types.Date }
});

const RendleGameState: Model<RendleGameStateDocument> = mongoose.model<RendleGameStateDocument>('RendleGameState', rendleGameStateSchema);

export {
	RendleGameState,
	RendleGameStateDocument
};