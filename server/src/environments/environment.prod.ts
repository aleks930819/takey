import { Environment } from './environments';

export const ProdEnviroment: Environment = {
  db_uri: process.env.DB_URI,
  test_db_uri: process.env.TEST_DB_URI,
  client_url: process.env.CLIENT_URL,
  email_host: process.env.EMAIL_HOST,
  email_port: Number(process.env.EMAIL_PORT),
  port: Number(process.env.PORT),
  node_env: process.env.NODE_ENV,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  salt_rounds: Number(process.env.SALT_ROUNDS),
  upload_path: process.env.UPLOAD_PATH,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires_in: process.env.JWT_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
};
