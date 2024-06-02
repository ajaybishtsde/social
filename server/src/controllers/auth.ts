import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user';
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
