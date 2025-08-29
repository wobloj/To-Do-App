import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import type { JwtUserPayload } from '../types/express';

export const signToken = (user: { _id:any, email: string, displayName?: string}): string =>
    jwt.sign(
        {sub: user._id.toString(), email: user.email, displayName: user.displayName} as JwtUserPayload,
        process.env.JWT_SECRET as string,
        {expiresIn: '7d'}
    );

export const authRequired = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7): (req as any).token;
    if(!token){
        try {
            const payload = jwt.verify(token, process.env.JWT_sECRET as string) as JwtUserPayload;
            req.auth = payload;
            next();
        } catch (e) {
            return res.status(401).json({error: "Nieprawidłowy lub wygasły token"});
        }
    }
};