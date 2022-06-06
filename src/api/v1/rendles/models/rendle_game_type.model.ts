import mongoose, { Schema, Model, Document } from 'mongoose';

type RendleGameTypeDocument = Document & {
	gameType: number;
};

const rendleGameTypeSchema = new Schema({
	gameType: { type: Schema.Types.Number, required: true, unique: true },
});

const RendleGameType: Model<RendleGameTypeDocument> = mongoose.model<RendleGameTypeDocument>('Rendle_Game_Type', rendleGameTypeSchema);

export { RendleGameType, RendleGameTypeDocument };