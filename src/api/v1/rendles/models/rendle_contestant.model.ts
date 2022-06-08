import mongoose, { Schema, Model, Document } from 'mongoose';
import { RendleContestType, UserType } from '../../db'

type RendleContestantType = { contest: string; user: string; walletAddress: string; };
type RendleContestantDocument = Document & RendleContestantType

const rendleContestSchema = new Schema({
	walletAddress: { type: Schema.Types.String, required: true },
	contest: { type: Schema.Types.ObjectId, ref: 'Rendle_Contest', requried: true },
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const RendleContestant: Model<RendleContestantDocument> = mongoose
	.model<RendleContestantDocument>('Rendle_Contestant', rendleContestSchema);

export { RendleContestantType, RendleContestantDocument, RendleContestant };