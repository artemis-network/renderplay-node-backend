import mongoose, { Schema, Model, Document } from 'mongoose';

interface RenderScanGameType {
	gameType: string;
	category: string;
	entryFee: number;
	filename: string
}

interface RenderScanGameTypeDoc extends RenderScanGameType, Document { };
interface RenderScanGameTypeModel extends Model<RenderScanGameTypeDoc> { };

const renderScanGameTypeSchema = new Schema({
	gameType: { type: Schema.Types.String, required: true, },
	category: { type: Schema.Types.String, required: true },
	entryFee: { type: Schema.Types.Number, required: true },
	filename: { type: Schema.Types.String, required: true },
});

const RenderScanGameType: RenderScanGameTypeModel = mongoose.model<RenderScanGameTypeDoc>('Renderscan_Game_Type', renderScanGameTypeSchema);

export { RenderScanGameType, RenderScanGameTypeDoc };