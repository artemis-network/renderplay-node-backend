import mongoose, { Schema, Model, Document } from 'mongoose';

export type RendleWordType = { guess: string; }

export type RendleWordDocument = Document & RendleWordType;

const rendleWordSchema = new Schema({
	guess: { type: Schema.Types.String, required: true, },
});

export const RendleWord: Model<RendleWordDocument> = mongoose
	.model<RendleWordDocument>('Rendle_Word', rendleWordSchema);
