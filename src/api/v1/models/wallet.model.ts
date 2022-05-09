import mongoose, { Schema, Model, Document } from 'mongoose';

type UserWalletDocument = Document & {
	balance: number;
	isActive: Boolean;
	user: string
};

const UserWalletSchema = new Schema(
	{
		balance: {
			type: Schema.Types.Number,
			required: true,
			default: 0
		},
		isActive: {
			type: Schema.Types.Boolean,
			required: true,
		},
		user: { type: Schema.Types.ObjectId, ref: 'User' }
	},
);


const UserWallet: Model<UserWalletDocument> = mongoose.model<UserWalletDocument>('UserWallet', UserWalletSchema);

export { UserWallet, UserWalletDocument };