import { Request, Response, NextFunction } from 'express';
import { startSession } from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user';
import { AuthModel } from '../models/auth';
import { sendVerificationEmail } from '../utils/verificationEmail';
import AppError from '../utils/appError';
// Create new user
export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const session = await startSession();
  session.startTransaction();
  try {
    const { name, email, phone, password, role } = req.body;

    // Check email or phone number already exists
    const existingUser = await UserModel.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return next(new AppError('Email or phone number already in use', 409));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create user
    const user = new UserModel({
      name,
      email,
      phone,
      is_email_verified: false,
      verification_token: verificationToken,
      is_phone_verified: false,
      is_need_to_change_password: false,
      is_active: true,
      role,
    });

    const createUserResult = await user.save();

    // Create the auth record
    const auth = new AuthModel({
      password: hashedPassword,
      user_id: user._id,
    });

    const authResult = await auth.save();
    console.log(createUserResult, authResult);
    await sendVerificationEmail(email, verificationToken);

    await session.commitTransaction();
    session.endSession();
    return res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
