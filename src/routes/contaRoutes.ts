import { Router } from 'express';
import ContaController from '../controllers/ContaController';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const contaController = new ContaController();

// Criar conta (acesso: Admin)
router.post('/', authMiddleware, roleMiddleware(['admin']), async (request, response) => {
    const { status, body } = await contaController.criarConta(request);
    response.status(status).json(body);
});

// Adicionar cliente à conta (acesso: Admin)
router.post('/adicionar-cliente', authMiddleware, roleMiddleware(['admin']), async (request, response) => {
    const { status, body } = await contaController.adicionarClienteAConta(request);
    response.status(status).json(body);
});

// Listar contas (acesso: Admin, Gerente, Atendente)
router.get('/', authMiddleware, roleMiddleware(['admin', 'gerente', 'atendente']), async (request, response) => {
    const { status, body } = await contaController.listarContas(request);
    response.status(status).json(body);
});

// Listar contas por CPF (acesso: Admin, Gerente, Atendente)
router.get('/cliente/:cpf', authMiddleware, roleMiddleware(['admin', 'gerente', 'atendente']), async (request, response) => {
    const { status, body } = await contaController.listarContasPorCpf(request);
    response.status(status).json(body);
});

export default router;