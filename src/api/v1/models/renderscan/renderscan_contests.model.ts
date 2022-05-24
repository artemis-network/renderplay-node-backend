import mongoose, { Schema, Model, Document } from 'mongoose';
import { UserDocument } from '../user.model'
import { RenderScanRefWordDocument } from './renderscan_ref_word.modal'

type RenderScanContestDocument = Document & {
	prizePool: number,
	minimumContestants: number,
	contestants: string[],
	refWord: RenderScanRefWordDocument
};

const renderScanContestSchema = new Schema(
	{
		prizePool: { type: Schema.Types.Number, required: true, default: 0 },
		minimumContestants: { type: Schema.Types.Number, required: true, default: 5 },
		contestants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		refWord: { type: Schema.Types.ObjectId, ref: 'RenderScanRefWord' }
	},
);


const RenderScanContest: Model<RenderScanContestDocument> = mongoose.model<RenderScanContestDocument>('RenderScanContest', renderScanContestSchema);

export { RenderScanContest, RenderScanContestDocument };