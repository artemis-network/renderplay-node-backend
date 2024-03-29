import mongoose, { Schema, Model, Document } from 'mongoose';
import { UserDocument } from '../../user/models/user.model'

interface RenderScanType { fileUrl: string; user: UserDocument }
interface RenderScanDoc extends RenderScanType, Document { };
interface RenderScanModel extends Model<RenderScanDoc> { }

const renderScanSchema = new Schema({
	fileUrl: { type: Schema.Types.String, required: true },
	user: { type: Schema.Types.ObjectId, ref: 'USER' }
});

const RenderScan: RenderScanModel = mongoose.model<RenderScanDoc>('Renderscan', renderScanSchema);


export { RenderScan, RenderScanDoc, RenderScanModel };