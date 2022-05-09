
import mongoose, { Schema, Model, Document } from 'mongoose';
import { UserDocument } from './user.model'

type WordsDocument = Document & {
	guess: String;
}

type WordsInputs = {
	guess: WordsDocument['guess']
}

const wordsSchema = new Schema(
	{
		guess: {
			type: Schema.Types.String,
			required: true
		},
	},
);

type RendleGameStateDocument = Document & {
	user: UserDocument;
	words: WordsDocument;
};

type RendleGameStateInput = {
	user: RendleGameStateDocument['user'];
	words: RendleGameStateDocument['words'];
};

const rendleGameStateSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		words: [{ type: Schema.Types.ObjectId, ref: 'Words' }]
	},
);


const Words: Model<WordsDocument> = mongoose.model<WordsDocument>('Words', wordsSchema);
const RendleGameState: Model<RendleGameStateDocument> = mongoose.model<RendleGameStateDocument>('RendleGameState', rendleGameStateSchema);

export {
	Words,
	WordsDocument,
	RendleGameState,
	RendleGameStateDocument
};