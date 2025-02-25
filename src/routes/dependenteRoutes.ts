import { Router } from 'express';
import DependenteController from '../controllers/DependenteController';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const dependenteController = new DependenteController();

// Listar dependentes (acesso: Admin, Gerente, Atendente)
router.get('/', authMiddleware, roleMiddleware(['admin', 'gerente', 'atendente', 'caixa']), async (request, response) => {
    const { status, body } = await dependenteController.listarDependentes(request);
    response.status(status).json(body);
});

// Buscar dependente por ID (acesso: Admin, Gerente, Atendente)
router.get('/:matricula/:nome', authMiddleware, roleMiddleware(['admin', 'gerente', 'atendente', 'caixa']), async (request, response) => {
    const { status, body } = await dependenteController.buscarDependentePorId(request);
    response.status(status).json(body);
});

// Criar dependente (acesso: Admin)
router.post('/', authMiddleware, roleMiddleware(['admin', 'gerente']), async (request, response) => {
    const { status, body } = await dependenteController.criarDependente(request);
    response.status(status).json(body);
});

// Atualizar dependente (acesso: Admin)
router.put('/:matricula/:nome', authMiddleware, roleMiddleware(['admin', 'gerente']), async (request, response) => {
    const { status, body } = await dependenteController.atualizarDependente(request);
    response.status(status).json(body);
});

// Deletar dependente (acesso: Admin)
router.delete('/:matricula/:nome', authMiddleware, roleMiddleware(['admin', 'gerente']), async (request, response) => {
    const { status, body } = await dependenteController.deletarDependente(request);
    response.status(status).json(body);
});

export default router;