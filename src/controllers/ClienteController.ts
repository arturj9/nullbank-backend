import { Request } from 'express';
import ClienteService from '../services/ClienteService';
import { ClienteCreate, ClienteUpdate, createClienteSchema, updateClienteSchema } from '../utils/validation';
import { Cliente } from '../@types/entities/Cliente';

export default class ClienteController {
    private clienteService: ClienteService;

    constructor() {
        this.clienteService = new ClienteService();
    }

    async criarCliente(request: Request): Promise<{ status: number; body: ClienteCreate | { message: string } }> {
        const validationData = createClienteSchema.parse(request.body);
        try {
            const cliente = await this.clienteService.criarCliente(validationData as ClienteCreate);
            return { status: 201, body: cliente };
        } catch (error) {
            return { status: 500, body: { message: 'Erro ao criar cliente.' } };
        }
    }

    async buscarClientePorCpf(request: Request): Promise<{ status: number; body: Cliente | { message: string } }> {
        const { cpf } = request.params;

        try {
            const cliente = await this.clienteService.buscarClientePorCpf(cpf);
            if (cliente) {
                return { status: 200, body: cliente };
            } else {
                return { status: 404, body: { message: 'Cliente não encontrado.' } };
            }
        } catch (error) {
            return { status: 500, body: { message: 'Erro ao buscar cliente.' } };
        }
    }

    async atualizarCliente(request: Request): Promise<{ status: number; body: { message: string } }> {
        const { cpf } = request.params;

        const validationData = updateClienteSchema.parse(request.body);
        try {
            const sucesso = await this.clienteService.atualizarCliente(cpf, validationData as ClienteUpdate);
            if (sucesso) {
                return { status: 200, body: { message: 'Cliente atualizado com sucesso.' } };
            } else {
                return { status: 404, body: { message: 'Cliente não encontrado.' } };
            }
        } catch (error) {
            return { status: 500, body: { message: 'Erro ao atualizar cliente.' } };
        }
    }

    async deletarCliente(request: Request): Promise<{ status: number; body: { message: string } }> {
        const { cpf } = request.params;

        try {
            const sucesso = await this.clienteService.deletarCliente(cpf);
            if (sucesso) {
                return { status: 200, body: { message: 'Cliente deletado com sucesso.' } };
            } else {
                return { status: 404, body: { message: 'Cliente não encontrado.' } };
            }
        } catch (error) {
            return { status: 500, body: { message: 'Erro ao deletar cliente.' } };
        }
    }

    async listarClientes(request: Request): Promise<{ status: number; body: Cliente[] | { message: string } }> {
        try {
            const clientes = await this.clienteService.listarClientes();
            return { status: 200, body: clientes };
        } catch (error) {
            return { status: 500, body: { message: 'Erro ao listar clientes.' } };
        }
    }
}