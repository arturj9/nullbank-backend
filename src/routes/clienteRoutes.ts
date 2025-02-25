import { Router } from 'express';
import ClienteController from '../controllers/ClienteController';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const clienteController = new ClienteController();

// Criar cliente (acesso: Admin)
router.post('/', authMiddleware, roleMiddleware(['admin']), async (request, response) => {
    const { status, body } = await clienteController.criarCliente(request);
    response.status(status).json(body);
});

// Buscar cliente por CPF (acesso: Admin, Gerente, Atendente)
router.get('/:cpf', authMiddleware, roleMiddleware(['admin', 'gerente', 'atendente']), async (request, response) => {
    const { status, body } = await clienteController.buscarClientePorCpf(request);
    response.status(status).json(body);
});

// Atualizar cliente (acesso: Admin)
router.put('/:cpf', authMiddleware, roleMiddleware(['admin']), async (request, response) => {
    const { status, body } = await clienteController.atualizarCliente(request);
    response.status(status).json(body);
});

// Deletar cliente (acesso: Admin)
router.delete('/:cpf', authMiddleware, roleMiddleware(['admin']), async (request, response) => {
    const { status, body } = await clienteController.deletarCliente(request);
    response.status(status).json(body);
});

// Listar clientes (acesso: Admin, Gerente, Atendente)
router.get('/', authMiddleware, roleMiddleware(['admin', 'gerente', 'atendente']), async (request, response) => {
    const { status, body } = await clienteController.listarClientes(request);
    response.status(status).json(body);
});

export default router;