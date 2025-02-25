import { Request } from 'express';
import DependenteService from '../services/DependenteService';
import { createDependenteSchema, updateDependenteSchema, DependenteCreate, DependenteUpdate } from '../utils/validation';
import { Dependente } from '../@types/entities/Dependente';
import { AppError } from '../errors/AppError';

export default class DependenteController {
    private dependenteService: DependenteService;

    constructor() {
        this.dependenteService = new DependenteService();
    }

    async criarDependente(request: Request): Promise<{ status: number; body: { message: string }}> {
        const validationData = createDependenteSchema.parse(request.body);
        const data = validationData as DependenteCreate;

        try {
            const result = await this.dependenteService.criarDependente(data);

            if (result.success) {
                return { status: 201, body: { message: 'Dependente criado com sucesso!' } };
            } else {
                return { status: 400, body: { message: result.message || 'Erro ao criar dependente.' } };
            }
        } catch (error) {
            return { status: 500, body: { message: 'Erro interno do servidor.' } };
        }
    }

    async atualizarDependente(request: Request): Promise<{ status: number; body: { message: string } }> {
        const { matricula, nome } = request.params;
        const validationData = updateDependenteSchema.parse(request.body);
        const data = validationData as DependenteUpdate;

        try {
            const sucesso = await this.dependenteService.atualizarDependente(Number(matricula), nome, data);
            if (sucesso) {
                return { status: 200, body: { message: 'Dependente atualizado com sucesso' } };
            } else {
                return { status: 404, body: { message: 'Dependente não encontrado' } };
            }
        } catch (error) {
            return { status: 500, body: { message: 'Erro ao atualizar dependente' } };
        }
    }

    async buscarDependentePorId(request: Request): Promise<{ status: number; body: Dependente | { message: string } }> {
        const { matricula, nome } = request.params;

        try {
            const dependente = await this.dependenteService.buscarDependentePorId(Number(matricula), nome);
            if (dependente) {
                return { status: 200, body: dependente };
            } else {
                return { status: 404, body: { message: 'Dependente não encontrado' } };
            }
        } catch (error) {
            console.log(error)

            return { status: 500, body: { message: 'Erro ao buscar dependente' } };
        }
    }

    async listarDependentes(request: Request): Promise<{ status: number; body: Dependente[] | { message: string } }> {
        try {
            const dependentes = await this.dependenteService.listarDependentes();
            return { status: 200, body: dependentes };
        } catch (error) {
            throw new AppError("Erro ao listar dependentes.");
        }
    }

    async deletarDependente(request: Request): Promise<{ status: number; body: { message: string } }> {
        const { matricula, nome  } = request.params;

        try {
            const sucesso = await this.dependenteService.deletarDependente(Number(matricula), nome );
            if (sucesso) {
                return { status: 200, body: { message: 'Dependente deletado com sucesso' } };
            } else {
                return { status: 404, body: { message: 'Dependente não encontrado' } };
            }
        } catch (error) {
            throw new AppError('Erro ao deletar dependente');
        }
    }
}