import * as jwt from 'jsonwebtoken';
import { environment } from '../../environments';

/**
 * Signs a JSON Web Token (JWT).
 * @param {mongoose.Types.ObjectId} _id
 * @returns {string} token
 */
const signToken = _id =>
  jwt.sign({ _id }, environment.jwt_secret, {
    expiresIn: environment.jwt_expires_in
  });

export default signToken;
