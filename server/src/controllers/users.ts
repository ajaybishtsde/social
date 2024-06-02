import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user';
import { AuthModel } from '../models/auth';
import { sendVerificationEmail } from '../utils/verificationEmail';

// Create new user
export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  console.log('request', req.body);
  const { name, email, phone, password, role } = req.body;

  try {
    // Check if the email or phone number already exists
    const existingUser = await UserModel.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Email or phone number already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create the user
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

    await user.save();

    // Create the auth record
    const auth = new AuthModel({
      password: hashedPassword,
      user_id: user._id,
    });

    await auth.save();

    await sendVerificationEmail(email, verificationToken);

    return res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    next(err);
  }
};
