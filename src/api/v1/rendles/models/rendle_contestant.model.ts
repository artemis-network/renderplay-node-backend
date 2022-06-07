import mongoose, { Schema, Model, Document } from 'mongoose';

type RendleContestantDocument = Document & { contest: string; user: string; walletAddress: string; };

const rendleContestSchema = new Schema(
	{
		walletAddress: { type: Schema.Types.String, required: true },
		contest: { type: Schema.Types.ObjectId, ref: 'Rendle_Contest', requried: true },
		user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
	},
);


const RendleContest: Model<RendleContestantDocument> = mongoose.model<RendleContestantDocument>('Rendle_Contestant', rendleContestSchema);

export { RendleContest, RendleContestantDocument };