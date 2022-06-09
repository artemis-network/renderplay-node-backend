import mongoose, { Schema, Model, Document } from 'mongoose';

interface RenderScanResultType { contest: string; user: string, scan: string }
interface RenderScanResultDoc extends RenderScanResultType, Document { }
interface RenderScanResultModel extends Model<RenderScanResultDoc> { }

const renderScanResultsSchema = new Schema({
	contest: { type: Schema.Types.ObjectId, required: true, ref: "Renderscan_Contest" },
	user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
	scan: [{ type: Schema.Types.ObjectId, ref: "Renderscan" }],
});

const RenderScanResults: RenderScanResultModel = mongoose.model<RenderScanResultDoc>('Renderscan_Result', renderScanResultsSchema);

export { RenderScanResults, RenderScanResultDoc };