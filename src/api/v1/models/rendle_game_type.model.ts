import mongoose, { Schema, Model, Document } from 'mongoose';

type RendleGameTypeDocument = Document & {
	gameType: number;
	startsOn?: Date;
	contestId?: string;
	isExpired: Boolean,
	entryFee: number,
};

const rendleGameTypeSchema = new Schema(
	{
		gameType: {
			type: Schema.Types.Number,
			required: true,
			unique: true,
		},
		startsOn: {
			type: Schema.Types.Date,
			required: false
		},
		contestId: {
			type: Schema.Types.String,
			requried: false,
		},
		isExpired: {
			type: Schema.Types.Boolean,
			required: true
		},
		entryFee: {
			type: Schema.Types.Number,
			required: true
		},
	},
);

const RendleGameType: Model<RendleGameTypeDocument> = mongoose.model<RendleGameTypeDocument>('RendleGameType', rendleGameTypeSchema);

export { RendleGameType, RendleGameTypeDocument };