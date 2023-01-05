import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  authorization?: JwtPayload | string;
  user?: string;
}
