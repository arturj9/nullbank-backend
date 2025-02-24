import { Router } from 'express';
import AgenciaController from '../controllers/AgenciaController';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const agenciaController = new AgenciaController();

// Listar todas as agências (acesso: Admin, Gerente, Atendente)
router.get('/', authMiddleware, roleMiddleware(['admin', 'gerente', 'atendente']), async (request, response) => {
    const { status, body } = await agenciaController.list(request);
    response.status(status).json(body);
});

// Buscar agência por ID (acesso: Admin, Gerente, Atendente)
router.get('/:id', authMiddleware, roleMiddleware(['admin', 'gerente', 'atendente']), async (request, response) => {
    const { status, body } = await agenciaController.buscarAgenciaPorId(request);
    response.status(status).json(body);
});

// Criar uma nova agência (acesso: Admin)
router.post('/', authMiddleware, roleMiddleware(['admin']), async (request, response) => {
    const { status, body } = await agenciaController.criarAgencia(request);
    response.status(status).json(body);
});

// Atualizar uma agência (acesso: Admin)
router.put('/:id', authMiddleware, roleMiddleware(['admin']), async (request, response) => {
    const { status, body } = await agenciaController.atualizarAgencia(request);
    response.status(status).json(body);
});

// Deletar uma agência (acesso: Admin)
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), async (request, response) => {
    const { status, body } = await agenciaController.deletarAgencia(request);
    response.status(status).json(body);
});

export default router;