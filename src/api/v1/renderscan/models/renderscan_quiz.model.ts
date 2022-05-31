import mongoose, { Schema, Model, Document } from 'mongoose';


interface RenderScanQuiz { questions: string[], contest: string, lobbyExpiresAt: Date }
interface RenderScanQuizDoc extends RenderScanQuiz, Document { }
interface RenderScanQuizModel extends Model<RenderScanQuizDoc> { }

const renderScanQuizSchema = new Schema({
	contest: { type: Schema.Types.ObjectId, ref: "RENDERSCAN_CONTEST" },
	questions: [{ type: Schema.Types.ObjectId, ref: "RENDERSCAN_QUIZ_QUESTION", required: true }],
	lobbyExpiresAt: { type: Schema.Types.Date, required: true }
});


const RenderScanQuiz: RenderScanQuizModel = mongoose.model<RenderScanQuizDoc>(
	'RENDERSCAN_QUIZ',
	renderScanQuizSchema
)

export { RenderScanQuiz, RenderScanQuizDoc };