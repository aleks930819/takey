import * as jwt from 'jsonwebtoken';
import * as dayjs from 'dayjs';

import { environment } from '../environments';
import { Token } from '../models';

const generateToken = (userId, tokenType, expireTime) => {
  return new Promise((resolve, reject) => {
    const payload = {
      sub: userId,
      iat: dayjs().unix(),
      exp: expireTime,
      type: tokenType
    };

    jwt.sign(payload, environment.jwt_secret, (err, token) => {
      if (err) {
        reject(new Error('Error generating token'));
      }
      resolve(token);
    });
  });
};

const saveTokenToDB = async (userId, token, tokenType, expiresAt, blacklisted = false) => {
  // Save the token to the database
  const tokenDoc = await Token.create({
    token,
    user: userId,
    type: tokenType,
    expires: expiresAt,
    blacklisted: blacklisted
  });

  return tokenDoc;
};

export interface TokenResponse {
  token: string;
  user: string;
  type: string;
  expires: Date;
  createdAt: Date;
  updatedAt: Date;
  blacklisted: boolean;
}

const veirfyToken = async (token, tokenType) => {
  const payload = jwt.verify(token, environment.jwt_secret);
  const tokenDoc = await Token.findOne({ token, type: tokenType, user: payload.sub, blacklisted: false });

  if (!tokenDoc) {
    throw new Error('Invalid token');
  }

  return (tokenDoc as unknown) as TokenResponse;
};

/**
 * Generates authentication tokens for a given user ID.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<{ accessToken: string, refreshToken: string }>} - The generated access and refresh tokens.
 */
const generateAuthTokens = async userId => {
  const refreshTokenExpires = dayjs().add(Number(environment.jwt_refresh_expires_in), 'days');
  const accessTokenExpires = dayjs().add(Number(environment.jwt_expires_in), 'minutes');

  const accessToken = await generateToken(userId, 'access', accessTokenExpires.unix());
  const refreshToken = await generateToken(userId, 'refresh', refreshTokenExpires.unix());

  await saveTokenToDB(userId, refreshToken, 'refresh', refreshTokenExpires.toDate());

  return {
    accessToken: {
      token: accessToken,
      expiresAt: accessTokenExpires.toDate()
    },
    refreshToken: {
      token: refreshToken,
      expiresAt: refreshTokenExpires.toDate()
    }
  };
};

const tokenService = {
  generateAuthTokens,
  veirfyToken,
  saveTokenToDB
};

export default tokenService;
