import mongoose, { Schema, Model, Document } from 'mongoose';

export type RendleGameTypeType = { gameType: number; }

export type RendleGameTypeDocument = Document & RendleGameTypeType;

const rendleGameTypeSchema = new Schema({
	gameType: { type: Schema.Types.Number, required: true, unique: true },
});

export const RendleGameType: Model<RendleGameTypeDocument> = mongoose
	.model<RendleGameTypeDocument>('Rendle_Game_Type', rendleGameTypeSchema);
