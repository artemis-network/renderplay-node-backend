import mongoose, { Schema, Model, Document } from 'mongoose';

type RenderScanResultsDocument = Document & {
	contestId: string;
	userId: string,
	scanId: string,
};

const renderScanResultsSchema = new Schema(
	{
		contestId: { type: Schema.Types.ObjectId, required: true },
		userId: { type: Schema.Types.ObjectId, required: true },
		scanId: { type: Schema.Types.ObjectId, required: true },
	},
);

const RenderScanResults: Model<RenderScanResultsDocument> = mongoose.model<RenderScanResultsDocument>('RenderScanResults', renderScanResultsSchema);

export { RenderScanResults, RenderScanResultsDocument };


