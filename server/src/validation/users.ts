import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const validateUserData = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'Name is required',
      'string.empty': 'Name cannot be empty',
    }),
    phone: Joi.string().required().messages({
      'any.required': 'Phone number is required',
      'string.empty': 'Phone number cannot be empty',
    }),
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.email': 'Email must be a valid email address',
      'string.empty': 'Email cannot be empty',
    }),

    password: Joi.string().required().messages({
      'any.required': 'Password is required',
      'string.empty': 'Password cannot be empty',
    }),
  });

  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error: any) {
    return res.status(400).json({
      error_type: 'VALIDATION_ERROR',
      error_message: error.details.map((detail: any) => detail.message).join(', '),
    });
  }
};
