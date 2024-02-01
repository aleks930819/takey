export interface Environment {
    db_uri: string;
    email_host: string;
    email_port: number;
    salt_rounds: number;
    port: Number;
    upload_path: string;
    auth: {
        user: string;
        pass: string;
    };
    jwt_secret: string;
    jwt_expires_in: string;
}
declare const environment: Environment;
export default environment;
