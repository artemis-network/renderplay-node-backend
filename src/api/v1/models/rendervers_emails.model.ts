import mongoose, { Schema, Model, Document } from 'mongoose';

type RenderverseEmailsDocument = Document & {
	email: String;
};

type RenderverseEmailsInput = {
	email: RenderverseEmailsDocument['email'];
};

const renderverseEmailsSchema = new Schema(
	{
		email: {
			type: Schema.Types.Number,
			required: true,
			unique: true,
		},
	},
);


const RenderverseEmails: Model<RenderverseEmailsDocument> = mongoose.model<RenderverseEmailsDocument>('RenderverseEmails', renderverseEmailsSchema);

export { RenderverseEmails, RenderverseEmailsInput, RenderverseEmailsDocument };