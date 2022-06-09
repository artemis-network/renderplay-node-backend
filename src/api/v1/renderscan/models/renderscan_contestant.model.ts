import mongoose, { Schema, Model, Document } from 'mongoose';

export type RenderScanContestantType = { contest: string; user: string; walletAddress: string; };
export type RenderScanContestantDoc = Document & RenderScanContestantType

const RenderScanContestSchema = new Schema({
	walletAddress: { type: Schema.Types.String, required: true },
	contest: { type: Schema.Types.ObjectId, ref: 'Renderscan_Contest', requried: true },
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export const RenderScanContestant: Model<RenderScanContestantDoc> = mongoose
	.model<RenderScanContestantDoc>('Renderscan_Contestant', RenderScanContestSchema);
