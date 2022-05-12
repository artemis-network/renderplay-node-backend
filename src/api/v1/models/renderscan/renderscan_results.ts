import mongoose, { Schema, Model, Document } from 'mongoose';
import { RenderScanDocument } from './renderscan.model'
import { RenderScanContestDocument } from './renderscan_contests.model'
import { UserDocument } from '../user.model';

type RenderScanResultsDocument = Document & {
	contestId: RenderScanContestDocument;
	userId: UserDocument,
	scanId: RenderScanDocument,
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


