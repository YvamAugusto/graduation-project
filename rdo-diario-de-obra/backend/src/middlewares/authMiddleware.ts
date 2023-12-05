import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userService } from '../services/userService';

const secretKey = "JRy&umI117>m!02N<e"

// interface AuthenticatedRequest extends Request {
//     user?: any;
// }

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    if (req.path === '/login') {
        return next();
    }
    const bearerToken = req.headers.authorization;
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        throw new Error();
    }
    const [, token] = bearerToken.split(' ');
    try {
        const decoded = jwt.verify(token, secretKey) as any;
        const user = await userService.findUser(decoded.id);
        if (!user) {
            throw new Error();
        }
    }
    catch (err) {
        return res.status(401).json({ message: 'Não autorizado' });
    }
    next();
}