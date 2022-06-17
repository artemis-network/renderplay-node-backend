import mongoose, { Schema, Model, Document } from 'mongoose';
import { UserType, RendleContestType, RendleWordType } from '../../db'

export type RendleGameStateType = {
	userId: string; contestId: string, words: string[],
}

export type RendleGameStateDocument = Document & RendleGameStateType;

const rendleGameStateSchema = new Schema({
	userId: { type: Schema.Types.String, unique: true },
	contestId: { type: Schema.Types.String },
	words: [{ type: Schema.Types.ObjectId, ref: 'Rendle_Word' }],
});

export const RendleGameState: Model<RendleGameStateDocument> = mongoose
	.model<RendleGameStateDocument>('Rendle_Game_State', rendleGameStateSchema);
