import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';

import { environment } from '../../environments';

/**
 * Generates a verification token with the specified number of digits.
 * @param digit The number of digits in the verification token. Default is 6.
 * @returns The generated verification token as a number.
 */
export function generateVerificationToken(digit: number = 6): number {
  const digits = '0123456789';
  let token = '';
  for (let i = 0; i < digit; i++) {
    token += digits[Math.floor(Math.random() * 10)];
  }
  return parseInt(token);
}

/**
 * Generates the expiration date for a token based on the given expireIn value.
 * @param expireIn - The duration in seconds after which the token will expire.
 * @returns The expiration date as a Date object.
 */
export const generateExpireDate = (expireIn: number) => {
  const now = new Date();

  const expireDate = new Date(now.getTime() + expireIn * 1000);
  return expireDate;
};

/**
 * Decodes a JSON Web Token (JWT).
 * @param {string} token - JWT
 * @returns {object} decoded token
 */

export const decodeToken = (token: string) => jwt.decode(token) as jwt.JwtPayload;

export const verifyToken = (token: string) => {
  return new Promise((resolve, reject) => {
    console.log(environment.jwt_secret);
    jwt.verify(token, environment.jwt_secret, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};

/**
 * Signs a JSON Web Token (JWT).
 * @param {mongoose.Types.ObjectId} _id - User ID
 * @returns {string} token
 */
export const signToken = (_id: mongoose.Types.ObjectId | string) =>
  jwt.sign({ _id }, environment.jwt_secret, {
    expiresIn: environment.jwt_expires_in,
  });
