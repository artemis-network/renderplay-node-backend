import mongoose, { Schema, Model, Document } from 'mongoose';

export type RenderScanGameStateType = {
	contest: string; user: string; currentQuestionIndex: number;
	currentQuestionStartsAt: Date; currentQuestionExpiresAt: Date
};

export type RenderScanGameStateDoc = Document & RenderScanGameStateType

const RenderScanContestSchema = new Schema({
	contest: { type: Schema.Types.ObjectId, ref: 'Renderscan_Contest', requried: true },
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	currentQuestionStartsAt: { type: Schema.Types.Date, required: true },
	currentQuestionExpiresAt: { type: Schema.Types.Date, required: true },
	currentQuestionIndex: { type: Schema.Types.Number, required: true, default: 0 }
});

export const RenderScanGameState: Model<RenderScanGameStateDoc> = mongoose
	.model<RenderScanGameStateDoc>('Renderscan_Game_State', RenderScanContestSchema);
String