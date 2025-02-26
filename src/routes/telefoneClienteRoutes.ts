import { Router } from 'express';
import TelefoneClienteController from '../controllers/TelefoneClienteController';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const telefoneClienteController = new TelefoneClienteController();

// Criar telefone do cliente (acesso: Admin)
router.post('/', authMiddleware, roleMiddleware(['admin']), async (request, response) => {
    const { status, body } = await telefoneClienteController.criarTelefoneCliente(request);
    response.status(status).json(body);
});

// Buscar telefones por cliente (acesso: Admin, Gerente, Atendente)
router.get('/:cpfCliente', authMiddleware, roleMiddleware(['admin', 'gerente', 'atendente']), async (request, response) => {
    const { status, body } = await telefoneClienteController.buscarTelefonesPorCliente(request);
    response.status(status).json(body);
});

// Atualizar telefone do cliente (acesso: Admin)
router.put('/:telefone/:cpfCliente', authMiddleware, roleMiddleware(['admin']), async (request, response) => {
    const { status, body } = await telefoneClienteController.atualizarTelefoneCliente(request);
    response.status(status).json(body);
});

// Deletar telefone do cliente (acesso: Admin)
router.delete('/:telefone/:cpfCliente', authMiddleware, roleMiddleware(['admin']), async (request, response) => {
    const { status, body } = await telefoneClienteController.deletarTelefoneCliente(request);
    response.status(status).json(body);
});

export default router;