import { Environment } from './environments';

export const ProdEnviroment: Environment = {
  db_uri: process.env.DB_URI,
  email_host: process.env.EMAIL_HOST,
  email_port: Number(process.env.EMAIL_PORT),
  port: Number(process.env.PORT),
  salt_rounds: Number(process.env.SALT_ROUNDS),
  upload_path: process.env.UPLOAD_PATH,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires_in: process.env.JWT_EXPIRES_IN
};