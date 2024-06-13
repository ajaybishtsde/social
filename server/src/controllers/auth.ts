import { Request, Response, NextFunction } from 'express';
import otpGenerator from 'otp-generator';
import { UserModel } from '../models/user';
import { sendOTP } from '../utils/twilioService';
import AppError from '../utils/appError';
export const verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { token } = req.query;

  const user = await UserModel.findOne({ verification_token: token });

  if (!user) {
    return next(new AppError('Invalid or expired token', 400));
  }
  user.is_email_verified = true;
  user.verification_token = null; // Clear the token after verification

  await user.save();

  return res.status(200).json({ message: 'Email verified successfully' });
};

// for OTP
const OTP_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes

export const requestOTP = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { phone } = req.body;

  // Generate OTP
  // @ts-ignore
  const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });

  // Save OTP and expiration time to the user's record
  const user = await UserModel.findOneAndUpdate(
    { phone },
    { otp, otp_expiration: Date.now() + OTP_EXPIRATION_TIME },
    { new: true, upsert: true }
  );
  console.log(user);
  // Send OTP via SMS
  const result = await sendOTP(phone, otp);

  return res.status(200).json({ message: 'OTP sent successfully' });
};
// verify OTP
export const verifyOTP = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { phone, otp } = req.body;

  const user = await UserModel.findOne({ phone });

  if (!user) {
    return next(new AppError('User not found', 400));
  }

  if (user.otp !== otp) {
    return next(new AppError('Invalid OTP', 400));
  }

  if (user.otp_expiration && Date.now() > user.otp_expiration) {
    return next(new AppError('OTP expired', 400));
  }

  // OTP is valid
  user.is_phone_verified = true;
  user.otp = null;
  user.otp_expiration = null;

  await user.save();

  return res.status(200).json({ message: 'Phone number verified successfully' });
};
