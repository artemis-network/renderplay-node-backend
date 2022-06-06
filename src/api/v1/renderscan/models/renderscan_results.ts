import mongoose, { Schema, Model, Document } from 'mongoose';

interface RenderScanResult { contestId: string; userId: string, scanId: string }
interface RenderScanResultDoc extends RenderScanResult, Document { }
interface RenderScanResultModel extends Model<RenderScanResultDoc> { }

const renderScanResultsSchema = new Schema({
	contestId: { type: Schema.Types.ObjectId, required: true, ref: "Renderscan_Contest" },
	userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
	scanId: [{ type: Schema.Types.ObjectId, ref: "Renderscan" }],
});

const RenderScanResults: RenderScanResultModel = mongoose.model<RenderScanResultDoc>('Renderscan_Result', renderScanResultsSchema);

export { RenderScanResults, RenderScanResultDoc };