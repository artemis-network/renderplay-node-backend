import mongoose, { Schema, Model, Document } from 'mongoose';


export interface RenderScanContestTypeStateType {
	gameTypeCounter: number, categoryTypeCounter: number
};

export interface RenderScanContestTypeStateDoc extends RenderScanContestTypeStateType, Document { }

interface RenderScanContestTypeModel extends Model<RenderScanContestTypeStateDoc> { }

const renderScanContestSchema = new Schema({
	gameTypeCounter: { type: Schema.Types.Number, required: true, default: 0 },
	categoryTypeCounter: { type: Schema.Types.Number, required: true, default: 0 },
});


export const RenderScanContestTypeState: RenderScanContestTypeModel = mongoose
	.model<RenderScanContestTypeStateDoc>('Renderscan_Contest_Type_State', renderScanContestSchema);
