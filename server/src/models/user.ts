import mongoose, { Schema, Document } from 'mongoose';
interface IUser extends Document {
  name: string;
  email: string;
  location: mongoose.Types.ObjectId;
  phone: string;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  is_need_to_change_password: boolean;
  //   role: mongoose.Types.ObjectId;
  role: string;
  is_active: boolean;
  deleted_at: Date | null;
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
    },
    is_active: {
      type: Boolean,
      default: false,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>('users', UserSchema);