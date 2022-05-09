import mongoose, { Schema, Model, Document } from 'mongoose';
import { UserDocument } from './user.model'

type RenderScanDocument = Document & {
	scan: any;
	fileName: string;
	user: UserDocument
};

const renderScanSchema = new Schema(
	{
		scan: {
			type: Schema.Types.Buffer,
			required: true,
		},
		filename: {
			type: Schema.Types.String,
			required: true,
		},
		user: { type: Schema.Types.ObjectId, ref: 'User' }
	},
);


const RenderScan: Model<RenderScanDocument> = mongoose.model<RenderScanDocument>('RenderScan', renderScanSchema);

export { RenderScan, RenderScanDocument };

