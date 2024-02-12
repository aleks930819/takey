import * as jwt from 'jsonwebtoken';

/**
 * Decodes a JSON Web Token (JWT).
 * @param {string} token - JWT
 * @returns {object} decoded token
 */

const decodeToken = (token: string) => jwt.decode(token) as jwt.JwtPayload;

export default decodeToken;
