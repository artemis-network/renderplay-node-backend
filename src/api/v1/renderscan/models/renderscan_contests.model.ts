import mongoose, { Schema, Model, Document } from 'mongoose';


interface RenderScanContest {
	gameType: string; startOn: Date;
	prizePool: number; minimumContestants: number; contestants: string[],
	quiz: string
};


interface RenderScanContestDoc extends RenderScanContest, Document { }
interface RenderScanContestModel extends Model<RenderScanContestDoc> { }

const renderScanContestSchema = new Schema({
	gameType: { type: Schema.Types.ObjectId, ref: "Renderscan_Game_Type", required: true },
	startsOn: { type: Schema.Types.Date, required: true },
	prizePool: { type: Schema.Types.Number, required: true, default: 0 },
	minimumContestants: { type: Schema.Types.Number, required: true, default: 5 },
	contestants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	quiz: { type: Schema.Types.ObjectId, ref: 'Renderscan_Quiz' }
});


const RenderScanContest: RenderScanContestModel = mongoose.model<RenderScanContestDoc>('RENDERSCAN_CONTEST', renderScanContestSchema);

export { RenderScanContest, RenderScanContestDoc };