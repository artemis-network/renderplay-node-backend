import mongoose, { Schema, Model, Document } from 'mongoose';
import { UserDocument } from '../user.model'

type RenderScanDocument = Document & {
	fileUrl: string;
	user: UserDocument
};

const renderScanSchema = new Schema(
	{
		fileUrl: {
			type: Schema.Types.String,
			required: true,
		},
		user: { type: Schema.Types.ObjectId, ref: 'User' }
	},
);


const RenderScan: Model<RenderScanDocument> = mongoose.model<RenderScanDocument>('RenderScan', renderScanSchema);

export { RenderScan, RenderScanDocument };

