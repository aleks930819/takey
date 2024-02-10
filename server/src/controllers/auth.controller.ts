import { Request, Response } from 'express';

import { RESPONSE_STATUS } from '../constants';
import { User } from '../models';
import { IUser } from '../models/user.model';
import { asnycHandler } from '../middlewares';
import { signToken } from '../utils/token';

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: {
        role: string;
        _id: string;
      }; // Define the user property on the Request object
    }
  }
}

//_____ PUBLIC CONTROLLERS _____//
/**
 * Registers a new user.
 *
 * @route POST /api/v1/auth/register
 * @access Public
 * @returns A JSON response containing the new user.
 */
const register = asnycHandler(async (req: Request, res: Response) => {
  const { name, email, password, passwordConfirm } = req.body;

  if (password !== passwordConfirm) {
    return res.status(400).json({
      status: RESPONSE_STATUS.FAIL,
      message: 'Passwords do not match'
    });
  }

  const user = await User.create({ name, email, password });

  const token = signToken(user._id);

  res.status(201).json({
    status: RESPONSE_STATUS.SUCCESS,
    token
  });
});
/**
 * Logs in a user.
 *
 * @route POST /api/v1/auth/login
 * @access Public
 * @returns A JSON response containing the user's token.
 */
const login = asnycHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  const token = signToken(user._id);

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({
      status: RESPONSE_STATUS.FAIL,
      message: 'Invalid email or password'
    });
  }
  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    token
  });
});

//_____ PRIVATE CONTROLLERS _____//
/**
 * Retrieves the currently logged in user.
 *
 * @route GET /api/v1/auth/me
 * @access Private
 * @returns A JSON response containing the user.
 */
const getMe = asnycHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user._id).select('-password');
  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      user
    }
  });
});

/**
 * Deletes the currently logged in user (sets the active field to false).
 *
 * @route DELETE /api/v1/auth/deleteMe
 * @access Private
 * @returns A JSON response containing the deleted user.
 */
const deleteMe = asnycHandler(async (req: Request, res: Response) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });
  res.status(204).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: null
  });
});
/**
 * Updates the currently logged in user.
 *
 * @route PATCH /api/v1/auth/updateMe
 * @access Private
 * @returns A JSON response containing the updated user.
 */
const updateMe = asnycHandler(async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, { name, email }, { new: true });
  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      user
    }
  });
});

const authController = {
  register,
  login,
  getMe,
  updateMe,
  deleteMe
};

export default authController;
