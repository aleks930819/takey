import { Response } from 'express';

import { RESPONSE_STATUS } from '../../constants';

import { IUser } from '../../models/user.model';

import { signToken } from './index';

/**
 * Creates and sends a token to the client.
 *
 * @param {Object} user - The user object.
 * @param {number} statusCode - The HTTP status code.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const createSendToken = (user: IUser, statusCode: number, res: Response) => {
  const token = signToken(user._id);

  user.password = undefined;

  res.status(statusCode).json({
    status: RESPONSE_STATUS.SUCCESS,
    token,
    data: {
      user,
    },
  });
};

export default createSendToken;
