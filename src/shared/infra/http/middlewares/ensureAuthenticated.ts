import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
    owner_id: string;
    username: string;
    email: string;
}

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({ error: "Provide a valid token!" })
    }
    const [,token] = authToken.split(" "); // remove the Bearer slot and just use the token slot
    try {
        const decoded = verify(token, process.env.JWT_SECRET);

        const { sub, email, owner_id, username} = decoded as ITokenPayload;
        req.user = {
            id: sub,
            owner_id,
            username,
            email,
          };
          return next();
    } catch(error) {
        console.log(error)
    }

}

export { ensureAuthenticated }