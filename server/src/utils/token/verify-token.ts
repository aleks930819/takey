import * as jwt from 'jsonwebtoken';

import { environment } from '../../environments';

const verifyToken = (token: string) => {
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

export default verifyToken;
