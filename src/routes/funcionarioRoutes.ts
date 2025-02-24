import { Router } from 'express';
import FuncionarioController from '../controllers/FuncionarioController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = Router();
const funcionarioController = new FuncionarioController();

// Criar um novo funcionário (acesso: Admin)
router.post('/', authMiddleware, roleMiddleware(['admin']), async (request, response) => {
    const { status, body } = await funcionarioController.criarFuncionario(request);
    response.status(status).json(body);
});

// Atualizar um funcionário existente (acesso: Admin)
router.put('/:matricula', authMiddleware, roleMiddleware(['admin']), async (request, response) => {
    const { status, body } = await funcionarioController.atualizarFuncionario(request);
    response.status(status).json(body);
});

// Buscar funcionário por matrícula (acesso: Admin, Gerente)
router.get('/:matricula', authMiddleware, roleMiddleware(['admin', 'gerente']), async (request, response) => {
    const { status, body } = await funcionarioController.buscarFuncionarioPorMatricula(request);
    response.status(status).json(body);
});

// Listar todos os funcionários (acesso: Admin, Gerente)
router.get('/', authMiddleware, roleMiddleware(['admin', 'gerente']), async (request, response) => {
    const { status, body } = await funcionarioController.listarFuncionarios();
    response.status(status).json(body);
});

// Deletar um funcionário (acesso: Admin)
router.delete('/:matricula', authMiddleware, roleMiddleware(['admin']), async (request, response) => {
    const { status, body } = await funcionarioController.deletarFuncionario(request);
    response.status(status).json(body);
});

export default router;