import mongoose, { Schema, Model, Document } from 'mongoose';

interface RenderScanResult { contestId: string; userId: string, scanId: string }
interface RenderScanResultDoc extends RenderScanResult, Document { }
interface RenderScanResultModel extends Model<RenderScanResultDoc> { }

const renderScanResultsSchema = new Schema({
	contestId: { type: Schema.Types.ObjectId, required: true, ref: "RENDERSCAN_CONTEST" },
	userId: { type: Schema.Types.ObjectId, required: true, ref: "USER" },
	scanId: [{ type: Schema.Types.ObjectId, ref: "RENDERSCAN" }],
});

const RenderScanResults: RenderScanResultModel = mongoose.model<RenderScanResultDoc>('RENDERSCAN_RESULT', renderScanResultsSchema);

export { RenderScanResults, RenderScanResultDoc };