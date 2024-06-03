import { Request, Response, NextFunction } from 'express';
import otpGenerator from 'otp-generator';
import { UserModel } from '../models/user';
import { sendOTP } from '../utils/twilioService';
export const verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { token } = req.query;

  try {
    const user = await UserModel.findOne({ verification_token: token });

    if (!user) {
      res.status(400).json({ message: 'Invalid or expired token' });
      return;
    }

    user.is_email_verified = true;
    user.verification_token = null; // Clear the token after verification

    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (err) {
    next(err);
  }
};

// for OTP
const OTP_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes

export const requestOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { phone } = req.body;

  try {
    // Generate OTP
    // @ts-ignore
    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });

    // Save OTP and expiration time to the user's record
    const user = await UserModel.findOneAndUpdate(
      { phone },
      { otp, otp_expiration: Date.now() + OTP_EXPIRATION_TIME },
      { new: true, upsert: true }
    );

    // Send OTP via SMS
    await sendOTP(phone, otp);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    next(err);
  }
};
// verify OTP
export const verifyOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { phone, otp } = req.body;

  try {
    const user = await UserModel.findOne({ phone });

    if (!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    if (user.otp !== otp) {
      res.status(400).json({ message: 'Invalid OTP' });
      return;
    }

    if (user.otp_expiration && Date.now() > user.otp_expiration) {
      res.status(400).json({ message: 'OTP expired' });
      return;
    }

    // OTP is valid
    user.is_phone_verified = true;
    user.otp = null;
    user.otp_expiration = null;

    await user.save();

    res.status(200).json({ message: 'Phone number verified successfully' });
  } catch (err) {
    next(err);
  }
};
