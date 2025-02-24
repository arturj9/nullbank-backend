export const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.userType)) {
            res.status(403).json({ message: 'Acesso negado' });
        }
        next();
    };
};
