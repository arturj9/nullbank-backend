import ClienteService from '../services/ClienteService.js';
export default class ClienteController {
    constructor() {
        this.clienteService = new ClienteService();
    }
    async listarClientes() {
        try {
            const clientes = await this.clienteService.listarClientes();
            return { status: 200, body: clientes };
        }
        catch (error) {
            return { status: 500, body: { message: 'Erro ao listar clientes' } };
        }
    }
    async buscarClientePorCpf(request) {
        const { cpf } = request.params;
        try {
            const cliente = await this.clienteService.buscarClientePorCpf(cpf);
            if (cliente) {
                return { status: 200, body: cliente };
            }
            else {
                return { status: 404, body: { message: 'Cliente não encontrado' } };
            }
        }
        catch (error) {
            return { status: 500, body: { message: 'Erro ao buscar cliente' } };
        }
    }
    async criarCliente(request) {
        const data = request.body;
        try {
            const cpf = await this.clienteService.criarCliente(data);
            return { status: 201, body: { cpf } };
        }
        catch (error) {
            return { status: 500, body: { message: 'Erro ao criar cliente' } };
        }
    }
    async atualizarCliente(request) {
        const { cpf } = request.params;
        const data = request.body;
        try {
            const sucesso = await this.clienteService.atualizarCliente(cpf, data);
            if (sucesso) {
                return { status: 200, body: { message: 'Cliente atualizado com sucesso' } };
            }
            else {
                return { status: 404, body: { message: 'Cliente não encontrado' } };
            }
        }
        catch (error) {
            return { status: 500, body: { message: 'Erro ao atualizar cliente' } };
        }
    }
    async deletarCliente(request) {
        const { cpf } = request.params;
        try {
            const sucesso = await this.clienteService.deletarCliente(cpf);
            if (sucesso) {
                return { status: 200, body: { message: 'Cliente deletado com sucesso' } };
            }
            else {
                return { status: 404, body: { message: 'Cliente não encontrado' } };
            }
        }
        catch (error) {
            return { status: 500, body: { message: 'Erro ao deletar cliente' } };
        }
    }
}
