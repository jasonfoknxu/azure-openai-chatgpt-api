import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../utils/config';
import { AuthRequest } from '../types/authRequest';
import { Token } from '../types/token';

/**
 * Login with username and password (header)
 *
 * @returns The access token and expire datetime of the token
 */
const login = async (req: Request, res: Response, next: NextFunction) => {
  let username: string = req.get('username') ?? '';
  const userPassword: string = req.get('password') ?? '';
  if (!username || !userPassword) {
    // No username or password
    return res.result('Missing username or password.', 403);
  }
  username = username.trim();
  let verification = await verifyUser(username, userPassword);
  if (!verification) {
    return res.result('Invalid username or password.', 401);
  }

  let newToken = await generateAccessToken(username);
  // If generate token fail
  if (!newToken) {
    return res.result('Invalid token.', 401);
  }

  return res.result({ token: newToken.token, expires: newToken.expiredAt }, 'Login success.');
};

/**
 * Verify user account by username and password
 *
 * @description Please change to your own verification method for the user authentication. ⚠️ This is a insecure demo. NOT for production!
 *
 * @returns The user verification result
 */
const verifyUser = async (username: string, password: string): Promise<boolean> => {
  return password === Buffer.from(username).toString('base64');
};

/**
 * Update the Access Token
 *
 * @returns The updated access token and the token expire datetime
 */
const reload = async (req: Request, res: Response, next: NextFunction) => {
  let newToken: Token | [string, number] = await refreshToken(req, res, next);
  if (Array.isArray(newToken)) {
    return res.result(newToken[0], newToken[1]);
  }
  if (!newToken || !newToken.token || !newToken.expiredAt) {
    return res.result('Missing or unsupported token.', 406);
  }
  return res.result({ token: newToken.token, expires: newToken.expiredAt }, 'Token updated.');
};

/**
 * Generate Access Token
 *
 * @returns The access token and expire datetime of the token
 */
const generateAccessToken = async (user: string | undefined): Promise<Token | null> => {
  if (!user) {
    return null;
  }
  const token = jwt.sign({ user: user }, config.TOKEN_SECRET, {
    expiresIn: `${config.TOKEN_TTL}s`,
  });
  return { token: token, expiredAt: getExpiredDate(config.TOKEN_TTL) };
};

/**
 * Check Access Token exists and is in supported format
 *
 * @returns The access token
 */
const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.includes(' ') || authHeader.split(' ')[0] !== 'Bearer') {
    return null;
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return null;
  }
  return token;
};

/**
 * Validate the Access Token
 *
 * @description ⚠️ This is a incomplete solution, the decoded token should be compared with the database record
 */
const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = checkToken(req, res, next);
  if (!token) {
    return res.result('Missing or unsupported token.', 406);
  }

  // Verify with JSON Web Token (JWT)
  jwt.verify(token, config.TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        // Expired Token
        return res.result('Token expired', 403);
      } else {
        // Token with error
        return res.result('Invalid token.', 401);
      }
    }
    if (!decoded) {
      return res.result('Token error.', 401);
    }

    // Pass the decoded token to the request
    req.authorization = decoded;
    // Pass the user ID to the request
    // req.user = /* User ID */;
    next();
  });
};

/**
 * Refresh Access Token
 *
 * @returns The new access token
 */
const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<Token | [string, number]> => {
  const token = checkToken(req, res, next);
  if (!token) {
    return ['Missing or unsupported token.', 406];
  }
  const user: string | undefined = req.get('user') ?? undefined;

  // Crate new Access Token
  let auth = await generateAccessToken(user);
  // If new token generate fail
  if (!auth || !auth.token) {
    return ['Invalid token.', 401];
  }

  return auth;
};

/**
 * Calculate the token expire datetime
 *
 * @returns The expire datetime of the token
 */
const getExpiredDate = (expireTime: number) => {
  let now = new Date();
  now.setTime(now.getTime() + expireTime * 1000);
  return new Date(now);
};

export { login, reload, authenticateToken };
