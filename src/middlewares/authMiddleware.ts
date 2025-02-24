import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import jwt_key from '../config/jwt';


export async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError("Token requerido", 401);
  }

  const [_, token] = authHeader.split(" ");

  try {
    const { sub } = jwt.verify(token, jwt_key);
    request.idUser = sub as string;
    request.userType = sub as string;

    return next();
  } catch (error) {
    throw new AppError("Token inválido", 401);
  }
}