import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user';
import { AuthModel } from '../models/auth';

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

    // Create the user
    const user = new UserModel({
      name,
      email,
      phone,
      is_email_verified: false,
      is_phone_verified: false,
      is_need_to_change_password: false,
      is_active: true, // Set to true initially, or handle activation separately
      role,
    });

    await user.save();

    // Create the auth record
    const auth = new AuthModel({
      password: hashedPassword,
      user_id: user._id,
    });

    await auth.save();

    return res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    next(err);
  }
};
