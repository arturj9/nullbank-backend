import { Request, Response, NextFunction } from 'express';

export const roleMiddleware = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.userType)) {
            res.status(403).json({ message: 'Acesso negado' });
        }
        next();
    };
};