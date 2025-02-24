import { ZodError } from "zod";
import { AppError } from "../errors/AppError";
export async function errorMiddleware(error, request, response, next) {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message,
        });
    }
    if (error instanceof ZodError) {
        return response.status(400).json({
            message: "Validation error.",
            issues: error.issues,
        });
    }
    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    });
    return;
}
