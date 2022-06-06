import { RendleWordDocument } from './rendle_word.model'
import mongoose, { Schema, Model, Document } from 'mongoose';

type RendleGameStateDocument = Document & {
	userId: string;
	contestId: string,
	words: Array<RendleWordDocument>,
	expiresIn: Date
};

const rendleGameStateSchema = new Schema({
	userId: { type: Schema.Types.String, unique: true },
	contestId: { type: Schema.Types.String },
	words: [{ type: Schema.Types.ObjectId, ref: 'Rendle_Word' }],
	expiresIn: { type: Schema.Types.Date }
});

const RendleGameState: Model<RendleGameStateDocument> = mongoose.model<RendleGameStateDocument>('Rendle_Game_State', rendleGameStateSchema);

export {
	RendleGameState,
	RendleGameStateDocument
};