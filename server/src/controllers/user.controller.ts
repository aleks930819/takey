import { Request, Response } from 'express';

import { User } from '../models';
import { asnycHandler } from '../middlewares';
import { RESPONSE_STATUS } from '../constants';

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
      users
    }
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
      user
    }
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
      user: null
    }
  });
});

/**
 * Updates a user by its ID.
 *
 * @route PUT /api/v1/users/:id
 * @access Private
 * @returns A JSON response containing the updated user.
 */
const updateUser = asnycHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      user
    }
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
      user
    }
  });
});

const userController = {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser
};

export default userController;
