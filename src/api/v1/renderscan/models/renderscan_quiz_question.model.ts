import mongoose, { Schema, Model, Document } from 'mongoose';

interface RenderScanQuizQuestionType {
	question: string, anwser: string, imageUrl: string, opensAt: Date
};

interface RenderScanQuizQuestionDoc extends RenderScanQuizQuestionType, Document { }
interface RenderScanQuizQuestionModel extends Model<RenderScanQuizQuestionDoc> { }

const renderScanQuizQuestionSchema = new Schema({
	question: { type: Schema.Types.String, required: true },
	anwser: { type: Schema.Types.String, required: true },
	imageUrl: { type: Schema.Types.String, required: true },
	opensAt: { type: Schema.Types.Date, required: true }
});

const RenderScanQuizQuestion: RenderScanQuizQuestionModel
	= mongoose.model
		<RenderScanQuizQuestionDoc>('Renderscan_Quiz_Question', renderScanQuizQuestionSchema);

export { RenderScanQuizQuestion, RenderScanQuizQuestionDoc };