import { Request } from 'express';
import ContaService from '../services/ContaService';
import { ContaHasClienteCreate, ContaUnificadaCreate, createContaHasClienteSchema, createContaUnificadaSchema } from '../utils/validation';
import { ContaHasCliente } from '../@types/entities/ContaHasCliente';

export default class ContaController {
    private contaService: ContaService;

    constructor() {
        this.contaService = new ContaService();
    }

    async criarConta(request: Request): Promise<{ status: number; body: any | { message: string } }> {
        try {
            const validationData = createContaUnificadaSchema.parse(request.body);
            const conta = await this.contaService.criarConta(validationData as ContaUnificadaCreate);
            return { status: 201, body: conta };
        } catch (error) {
            return { status: 500, body: { message: error || 'Erro ao criar conta.' } };
        }
    }

    async adicionarClienteAConta(request: Request): Promise<{ status: number; body: ContaHasCliente | { message: string } }> {
        try {
            const validationData = createContaHasClienteSchema.parse(request.body);
            const contaHasCliente = await this.contaService.adicionarClienteAConta(validationData as ContaHasClienteCreate);
            return { status: 201, body: contaHasCliente };
        } catch (error) {
            return { status: 500, body: { message: 'Erro ao adicionar cliente à conta.' } };
        }
    }

    async listarContas(request: Request): Promise<{ status: number; body: any[] | { message: string } }> {
        try {
            const contas = await this.contaService.listarContas();
            return { status: 200, body: contas };
        } catch (error) {
            console.log(error)
            return { status: 500, body: { message: 'Erro ao listar contas.' } };
        }
    }

    async listarContasPorCpf(request: Request): Promise<{ status: number; body: any[] | { message: string } }> {
        const { cpf } = request.params;

        try {
            const contas = await this.contaService.listarContasPorCpf(cpf);
            return { status: 200, body: contas };
        } catch (error) {
            return { status: 500, body: { message: 'Erro ao listar contas do cliente.' } };
        }
    }
}