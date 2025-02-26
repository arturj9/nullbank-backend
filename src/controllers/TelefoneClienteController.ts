import { Request } from 'express';
import TelefoneClienteService from '../services/TelefoneClienteService';
import { TelefoneClienteCreate, TelefoneClienteUpdate, createTelefoneClienteSchema, updateTelefoneClienteSchema } from '../utils/validation';
import { TelefoneCliente } from '../@types/entities/TelefoneCliente';

export default class TelefoneClienteController {
    private telefoneClienteService: TelefoneClienteService;

    constructor() {
        this.telefoneClienteService = new TelefoneClienteService();
    }

    async criarTelefoneCliente(request: Request): Promise<{ status: number; body: TelefoneCliente | { message: string } }> {
        try {
            const validationData = createTelefoneClienteSchema.parse(request.body);
            const telefoneCliente = await this.telefoneClienteService.criarTelefoneCliente(validationData as TelefoneClienteCreate);
            return { status: 201, body: telefoneCliente };
        } catch (error) {
            return { status: 500, body: { message: 'Erro ao criar telefone do cliente.' } };
        }
    }

    async buscarTelefonesPorCliente(request: Request): Promise<{ status: number; body: TelefoneCliente[] | { message: string } }> {
        const { cpfCliente } = request.params;

        try {
            const telefones = await this.telefoneClienteService.buscarTelefonesPorCliente(cpfCliente);
            return { status: 200, body: telefones };
        } catch (error) {
            return { status: 500, body: { message: 'Erro ao buscar telefones do cliente.' } };
        }
    }

    async atualizarTelefoneCliente(request: Request): Promise<{ status: number; body: { message: string } }> {
        const { telefone, cpfCliente } = request.params;

        try {
            const validationData = updateTelefoneClienteSchema.parse(request.body);
            const sucesso = await this.telefoneClienteService.atualizarTelefoneCliente(telefone, cpfCliente, validationData as TelefoneClienteUpdate);
            if (sucesso) {
                return { status: 200, body: { message: 'Telefone do cliente atualizado com sucesso.' } };
            } else {
                return { status: 404, body: { message: 'Telefone do cliente não encontrado.' } };
            }
        } catch (error) {
            return { status: 500, body: { message: 'Erro ao atualizar telefone do cliente.' } };
        }
    }

    async deletarTelefoneCliente(request: Request): Promise<{ status: number; body: { message: string } }> {
        const { telefone, cpfCliente } = request.params;

        try {
            const sucesso = await this.telefoneClienteService.deletarTelefoneCliente(telefone, cpfCliente);
            if (sucesso) {
                return { status: 200, body: { message: 'Telefone do cliente deletado com sucesso.' } };
            } else {
                return { status: 404, body: { message: 'Telefone do cliente não encontrado.' } };
            }
        } catch (error) {
            return { status: 500, body: { message: 'Erro ao deletar telefone do cliente.' } };
        }
    }
}