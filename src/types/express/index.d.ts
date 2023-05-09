import * as jwt from 'jsonwebtoken';

export {}

declare global {
  namespace Express {
    export interface Request {
        user: string | jwt.JwtPayload | undefined;
    }
    export interface Response {
        user: string | jwt.JwtPayload | undefined;
    }
  }
}