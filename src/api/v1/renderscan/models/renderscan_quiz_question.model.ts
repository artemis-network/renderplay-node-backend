import mongoose, { Schema, Model, Document } from 'mongoose';

interface RenderScanQuizQuestion {
	question: string, anwser: string,
	imageUrl: string, opensAt: Date
};

interface RenderScanQuizQuestionDoc extends RenderScanQuizQuestion, Document { }
interface RenderScanQuizQuestionModel extends Model<RenderScanQuizQuestionDoc> { }

const renderScanQuizQuestionSchema = new Schema({
	question: { type: Schema.Types.String, required: true },
	anwser: { type: Schema.Types.String, required: true },
	imageUrl: { type: Schema.Types.String, required: true },
	opensAt: { type: Schema.Types.Date, required: true }
});

const RenderScanQuizQuestion: RenderScanQuizQuestionModel
	= mongoose.model
		<RenderScanQuizQuestionDoc>('RENDERSCAN_QUIZ_QUESTION', renderScanQuizQuestionSchema);

export { RenderScanQuizQuestion, RenderScanQuizQuestionDoc };