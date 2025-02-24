import { Router } from 'express';
import ClienteController from '../controllers/ClienteController.js';
const router = Router();
const clienteController = new ClienteController();
router.get('/clientes', async (request, response) => {
    const { status, body } = await clienteController.listarClientes();
    response.status(status).json(body);
});
router.get('/clientes/:cpf', async (request, response) => {
    const { status, body } = await clienteController.buscarClientePorCpf(request);
    response.status(status).json(body);
});
router.post('/clientes', async (request, response) => {
    const { status, body } = await clienteController.criarCliente(request);
    response.status(status).json(body);
});
router.put('/clientes/:cpf', async (request, response) => {
    const { status, body } = await clienteController.atualizarCliente(request);
    response.status(status).json(body);
});
router.delete('/clientes/:cpf', async (request, response) => {
    const { status, body } = await clienteController.deletarCliente(request);
    response.status(status).json(body);
});
export default router;
