import mongoose, { Schema, Document } from 'mongoose';
interface IUser extends Document {
  name: string;
  email: string;
  location: mongoose.Types.ObjectId;
  phone: string;
  is_email_verified: boolean;
  verification_token: string | null;
  is_phone_verified: boolean;
  otp: string | null;
  otp_expiration: number | null;
  is_need_to_change_password: boolean;
  //   role: mongoose.Types.ObjectId;
  role: string;
  is_active: boolean;
  deleted_at: Date | null;
  followers: mongoose.Types.ObjectId;
  blocked_accounts: mongoose.Types.ObjectId;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: 'city',
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    is_email_verified: {
      type: Boolean,
      default: false,
    },
    verification_token: {
      type: String,
      default: null,
    },
    is_phone_verified: {
      type: Boolean,
      default: false,
    },
    is_need_to_change_password: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      required: true,
      default: 'user',
    },
    is_active: {
      type: Boolean,
      default: false,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    ],
    blocked_accounts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    ],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>('users', UserSchema);
