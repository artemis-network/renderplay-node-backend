import mongoose, { Schema, Model, Document } from 'mongoose';

type RenderScanRefWordDocument = Document & {
	contestId: string;
	word: string,
	image: any,
};

const renderScanRefWordSchema = new Schema(
	{
		contestId: { type: Schema.Types.String, required: true },
		word: { type: Schema.Types.String, required: true },
		image: { type: Schema.Types.Buffer, required: true },
	},
);

const RenderScanRefWord: Model<RenderScanRefWordDocument> = mongoose.model<RenderScanRefWordDocument>('RendleScanRefWord', renderScanRefWordSchema);

export { RenderScanRefWord, RenderScanRefWordDocument };
