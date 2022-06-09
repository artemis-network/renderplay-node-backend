import mongoose, { Schema, Model, Document } from 'mongoose';


interface RenderScanQuizType { questions: string[], contest: string, lobbyExpiresAt: Date }
interface RenderScanQuizDoc extends RenderScanQuizType, Document { }
interface RenderScanQuizModel extends Model<RenderScanQuizDoc> { }

const renderScanQuizSchema = new Schema({
	contest: { type: Schema.Types.ObjectId, ref: "Renderscan_Contest" },
	questions: [{ type: Schema.Types.ObjectId, ref: "Renderscan_Quiz_Question", required: true }],
	lobbyExpiresAt: { type: Schema.Types.Date, required: true }
});


const RenderScanQuiz: RenderScanQuizModel = mongoose.model<RenderScanQuizDoc>(
	'Renderscan_Quiz',
	renderScanQuizSchema
)

export { RenderScanQuiz, RenderScanQuizDoc };