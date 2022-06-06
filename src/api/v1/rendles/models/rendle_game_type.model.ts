import mongoose, { Schema, Model, Document } from 'mongoose';

type RendleGameTypeDocument = Document & {
	gameType: number;
	entryFee: number,
};

const rendleGameTypeSchema = new Schema(
	{
		gameType: {
			type: Schema.Types.Number,
			required: true,
			unique: true,
		},
		entryFee: {
			type: Schema.Types.Number,
			required: true
		},
	},
);

const RendleGameType: Model<RendleGameTypeDocument> = mongoose.model<RendleGameTypeDocument>('RendleGameType', rendleGameTypeSchema);

export { RendleGameType, RendleGameTypeDocument };