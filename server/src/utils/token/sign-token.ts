import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';
import { environment } from '../../environments';

/**
 * Signs a JSON Web Token (JWT).
 * @param {mongoose.Types.ObjectId} _id - User ID
 * @returns {string} token
 */
const signToken = (_id: mongoose.Types.ObjectId | string) =>
  jwt.sign({ _id }, environment.jwt_secret, {
    expiresIn: environment.jwt_expires_in
  });

export default signToken;
