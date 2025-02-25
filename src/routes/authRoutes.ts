import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const router = Router();
const authController = new AuthController();

// Rota de login
router.post('/login', async (request, response) => {
    const { status, body } = await authController.login(request);
    response.status(status).json(body);
});

export default router;