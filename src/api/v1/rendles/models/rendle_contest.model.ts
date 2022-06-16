import mongoose, { Schema, Model, Document } from 'mongoose';

export type RendleContestType = {
	gameType: string; entryFee: number; startsOn?: Date; minimumContestants: number;
	prizePool: number; isExpired: Boolean, isVisible: Boolean,
	contestants: string[]; opensAt?: Date; expiresAt?: Date
}

export type RendleContestDocument = Document & RendleContestType;

const rendleContestSchema = new Schema({
	minimumContestants: { type: Schema.Types.Number, required: true, },
	startsOn: { type: Schema.Types.Date, required: false },
	opensAt: { type: Schema.Types.Date, required: false },
	expiresAt: { type: Schema.Types.Date, required: false },
	isExpired: { type: Schema.Types.Boolean, required: true },
	isVisible: { type: Schema.Types.Boolean, required: true },
	prizePool: { type: Schema.Types.Number, required: true, default: 0 },
	entryFee: { type: Schema.Types.Number, required: true, default: 0 },
	gameType: { type: Schema.Types.ObjectId, ref: 'Rendle_Game_Type', requried: false, },
	contestants: [{ type: Schema.Types.ObjectId, ref: 'Rendle_Contestant' }]
});

export const RendleContest: Model<RendleContestDocument> = mongoose
	.model<RendleContestDocument>('Rendle_Contest', rendleContestSchema);
