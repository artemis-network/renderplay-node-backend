import mongoose, { Schema, Model, Document } from 'mongoose';


export interface RenderScanContestType {
	gameType: string; startOn: Date; prizePool: number; minimumContestants: number;
	contestants: string[], quiz: string
};

export interface RenderScanContestDoc extends RenderScanContestType, Document { }
interface RenderScanContestModel extends Model<RenderScanContestDoc> { }

const renderScanContestSchema = new Schema({
	gameType: { type: Schema.Types.ObjectId, ref: "Renderscan_Game_Type", required: true },
	entryFee: { type: Schema.Types.Number, required: true },
	startsOn: { type: Schema.Types.Date, required: true },
	prizePool: { type: Schema.Types.Number, required: true, default: 0 },
	minimumContestants: { type: Schema.Types.Number, required: true, default: 5 },
	contestants: [{ type: Schema.Types.ObjectId, ref: 'Renderscan_Contestant' }],
	quiz: { type: Schema.Types.ObjectId, ref: 'Renderscan_Quiz' }
});


export const RenderScanContest: RenderScanContestModel = mongoose.model<RenderScanContestDoc>('Renderscan_Contest', renderScanContestSchema);
