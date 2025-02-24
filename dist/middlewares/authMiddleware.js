import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import jwt_key from '../config/jwt';
export async function authMiddleware(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError("Token requerido", 401);
    }
    const [_, token] = authHeader.split(" ");
    try {
        const { sub } = jwt.verify(token, jwt_key);
        request.idUser = sub;
        request.userType = sub;
        return next();
    }
    catch (error) {
        throw new AppError("Token inválido", 401);
    }
}
