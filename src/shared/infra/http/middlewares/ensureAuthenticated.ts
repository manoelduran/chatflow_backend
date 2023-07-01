import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '@shared/errors/AppError';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
    owner_id: string;
    username: string;
    email: string;
}

 function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {

    const authToken = req.headers.authorization;
    if (!authToken) {
        return next(new AppError('JWT token is missing', 404))
    }
    const [, token] = authToken.split(' '); // remove the Bearer slot and just use the token slot

    try {
        const decoded = verify(token, process.env.JWT_SECRET || 'default');
        req.originalUrl;

        const { sub, email, owner_id, username } = decoded as ITokenPayload;

        req.user = {
            id: owner_id,
            owner_id,
            username,
            email
        };
        return next();
    } catch (error) {
        console.log(error)
  
        throw new AppError('Invalid JWT token', 401);
    }

}

export { ensureAuthenticated }