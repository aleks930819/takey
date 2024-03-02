import { Request, Response } from 'express';

import { User } from '../models';
import { asnycHandler } from '../middlewares';
import { RESPONSE_STATUS } from '../constants';
import asyncHandler from '../middlewares/async-handler';
import { NodeMailer } from '../services';
import { generateVerificationToken } from '../utils/token';

//_____ ADMIN CONTROLLERS _____//
/**
 * Retrieves all users from the database.
 *
 * @route GET /api/v1/users
 * @access Private
 * @returns A JSON response containing the list of users.
 */

const getAllUsers = asnycHandler(async (req: Request, res: Response) => {
  const users = await User.find().select('-password');
  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    results: users.length,
    data: {
      users,
    },
  });
});

/**
 * Retrieves a user by its ID.
 *
 * @route GET /api/v1/users/:id
 * @access Private
 * @returns A JSON response containing the user.
 */
const getUser = asnycHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      user,
    },
  });
});

/**
 * Deletes a user by its ID.
 *
 * @route DELETE /api/v1/users/:id
 * @access Private
 * @returns A JSON response containing the deleted user.
 */
const deleteUser = asnycHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      user: null,
    },
  });
});

/**
 * Updates a user by its ID.
 *
 * @route PATCH /api/v1/users/:id
 * @access Private
 * @returns A JSON response containing the updated user.
 */
const updateUser = asnycHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      user,
    },
  });
});

/**
 * Sends a reset password email to the user.
 *
 * @route POST /api/v1/users/reset-password
 * @access Public
 * @returns A JSON response containing a success message.
 */
const sednResetPasswordToken = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  const resetPasswordToken = generateVerificationToken();
  const MAX_TOKEN_TIME = 30 * 60 * 1000; // 30 minutes

  const user = await User.findOneAndUpdate(
    {
      email,
    },
    {
      resetPasswordToken,
      resetPasswordTokenTime: Date.now() + MAX_TOKEN_TIME,
    },
    {
      new: true,
    },
  );

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  await NodeMailer.sendMail({
    to: user.email,
    subject: 'Reset Password',
    html: `<h3>Hi there!</h3>
      <p>Thanks for using our service!</p>
      <p>Your reset password token is <b>${resetPasswordToken}</b>.</p>
      <p>The token expires in 30 minutes.</p>
      <p>Have a pleasant day.</p>`,
  });

  res.status(200).json({
    success: true,
    message: 'Reset password email sent successfully',
  });
});

/**
 * Sets a new password for the user.
 *
 * @route POST /api/v1/users/set-new-password
 * @access Public
 * @returns A JSON response containing a success message.
 */
const setNewPassword = asyncHandler(async (req: Request, res: Response) => {
  const { resetPasswordToken, newPassword, email } = req.body;

  const user = await User.findOneAndUpdate(
    {
      email,
      resetPasswordToken,
      resetPasswordTokenTime: { $gt: Date.now() },
    },
    {
      password: newPassword,
      resetPasswordToken: undefined,
      resetPasswordTokenTime: undefined,
    },
    {
      new: true,
    },
  );

  if (!user) {
    res.status(400);
    throw new Error('Invalid token');
  }

  res.status(200).json({
    success: true,
    message: 'Password reset successfully',
  });
});

/**
 * Creates a new user.
 *
 * @route POST /api/v1/users
 * @access Private
 * @returns A JSON response containing the new user.
 */
const createUser = asnycHandler(async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      user,
    },
  });
});

const userController = {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser,
  sednResetPasswordToken,
  setNewPassword,
};

export default userController;
