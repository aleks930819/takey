import { DevEnviroment } from './environment.dev';
import { ProdEnviroment } from './environment.prod';


export interface Environment {
  db_uri: string;
  email_host: string;
  email_port: number;
  salt_rounds: number;
  port: number;
 
  node_env: string;
  upload_path: string;
  cloudinary_cloud_name: string;
  cloudinary_api_key: string;
  cloudinary_api_secret: string;
  auth: {
    user: string;
    pass: string;
  };
  jwt_secret: string;
  jwt_expires_in: string;
}
/**
 * Retrieves the environment variables based on the current NODE_ENV value.
 * If NODE_ENV is set to 'production', it returns the production environment variables.
 * Otherwise, it returns the development environment variables.
 * @returns {Environment} The environment variables.
 */
function getEnvironmentVariables(): Environment {
  if (process.env.NODE_ENV === 'production') {
    return ProdEnviroment;
  }
  return DevEnviroment;
}

const environment = getEnvironmentVariables();

export default environment;
