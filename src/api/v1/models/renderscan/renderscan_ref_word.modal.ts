import mongoose, { Schema, Model, Document } from 'mongoose';

type RenderScanRefWordDocument = Document & {
	word: string,
	image: any,
};

const renderScanRefWordSchema = new Schema(
	{
		word: { type: Schema.Types.String, required: false },
		image: { type: Schema.Types.String, required: true },
	},
);

const RenderScanRefWord: Model<RenderScanRefWordDocument> = mongoose.model<RenderScanRefWordDocument>('RenderScanRefWord', renderScanRefWordSchema);

export { RenderScanRefWord, RenderScanRefWordDocument };
