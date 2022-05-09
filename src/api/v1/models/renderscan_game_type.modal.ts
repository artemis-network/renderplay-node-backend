import mongoose, { Schema, Model, Document } from 'mongoose';

enum RenderScanType {
	FREE,
	PAID
}

type RenderScanGameTypeDocument = Document & {
	gameType: RenderScanType;
	startsOn?: Date;
	contestId?: string,
	isExpired: Boolean,
	entryFee: number,
};

const renderScanGameTypeSchema = new Schema(
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

const RenderScanGameType: Model<RenderScanGameTypeDocument> = mongoose.model<RenderScanGameTypeDocument>('RenderScanGameType', renderScanGameTypeSchema);

export { RenderScanGameType, RenderScanGameTypeDocument };