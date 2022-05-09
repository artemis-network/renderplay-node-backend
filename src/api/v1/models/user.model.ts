import mongoose, { Schema, Model, Document } from 'mongoose';

type UserDocument = Document & {
  username: string;
  email: string;
  password: string;
  isGoogleAccount: Boolean,
  isVerified: Boolean,
  isActivated: Boolean,
  token: String
};


const userSchema = new Schema(
  {
    username: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      requried: true,
    },
    isGoogleAccount: {
      type: Schema.Types.Boolean,
      required: true
    },
    isVerified: {
      type: Schema.Types.Boolean,
      required: true
    },
    isActivated: {
      type: Schema.Types.Boolean,
      required: true
    },
    token: {
      type: Schema.Types.String,
    },
  },
);

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);

export { User, UserDocument };