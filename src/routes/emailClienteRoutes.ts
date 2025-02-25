import { Router } from 'express';
import EmailClienteController from '../controllers/EmailClienteController';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const emailClienteController = new EmailClienteController();

// Criar e-mail do cliente (acesso: Admin)
router.post('/', authMiddleware, roleMiddleware(['admin']), async (request, response) => {
    const { status, body } = await emailClienteController.criarEmailCliente(request);
    response.status(status).json(body);
});

// Buscar e-mails por cliente (acesso: Admin, Gerente, Atendente)
router.get('/:cpfCliente', authMiddleware, roleMiddleware(['admin', 'gerente', 'atendente']), async (request, response) => {
    const { status, body } = await emailClienteController.buscarEmailsPorCliente(request);
    response.status(status).json(body);
});

// Atualizar e-mail do cliente (acesso: Admin)
router.put('/:email/:cpfCliente', authMiddleware, roleMiddleware(['admin']), async (request, response) => {
    const { status, body } = await emailClienteController.atualizarEmailCliente(request);
    response.status(status).json(body);
});

// Deletar e-mail do cliente (acesso: Admin)
router.delete('/:email/:cpfCliente', authMiddleware, roleMiddleware(['admin']), async (request, response) => {
    const { status, body } = await emailClienteController.deletarEmailCliente(request);
    response.status(status).json(body);
});

export default router;