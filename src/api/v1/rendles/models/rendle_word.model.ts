import mongoose, { Schema, Model, Document } from 'mongoose';

type RendleWordDocument = Document & {
	guess: string;
};

const rendleWordSchema = new Schema(
	{
		guess: {
			type: Schema.Types.String,
			required: true,
		},
	},
);


const RendleWord: Model<RendleWordDocument> = mongoose.model<RendleWordDocument>('RendleWord', rendleWordSchema);

export { RendleWord, RendleWordDocument };