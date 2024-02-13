declare namespace Express {
  export interface Request {
    user: {
      role: string;
      _id: string;
    };
  }
}
