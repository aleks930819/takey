"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevEnviroment = void 0;
exports.DevEnviroment = {
    db_uri: process.env.DB_URI,
    email_host: process.env.EMAIL_HOST,
    email_port: Number(process.env.EMAIL_PORT),
    port: Number(process.env.PORT),
    node_env: process.env.NODE_ENV,
    salt_rounds: Number(process.env.SALT_ROUNDS),
    upload_path: process.env.UPLOAD_PATH,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_in: process.env.JWT_EXPIRES_IN
};
