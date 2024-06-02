import mongoose, { Schema, Document } from 'mongoose';

interface IAuth extends Document {
  password: string;
  reset_password_token: string | null;
  profile_picture: string | null;
  user_id: mongoose.Types.ObjectId;
}

const AuthSchema = new Schema<IAuth>(
  {
    password: {
      type: String,
      required: true,
    },
    reset_password_token: {
      type: String,
      default: null,
    },
    profile_picture: {
      type: String,
      default: null,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  { timestamps: true }
);

export const AuthModel = mongoose.model<IAuth>('auth', AuthSchema);
