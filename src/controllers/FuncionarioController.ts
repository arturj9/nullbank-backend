import { Request } from 'express';
import FuncionarioService from '../services/FuncionarioService.js';
import { createFuncionarioSchema, updateFuncionarioSchema, FuncionarioCreate, FuncionarioUpdate } from '../utils/validation.js';
import { Funcionario } from '../@types/entities/Funcionario.js';

export default class FuncionarioController {
    private funcionarioService: FuncionarioService;

    constructor() {
        this.funcionarioService = new FuncionarioService();
    }

    // Criar um novo funcionário
    async criarFuncionario(request: Request): Promise<{ status: number; body: Funcionario | null | { message: string } }> {
        const validationData = createFuncionarioSchema.parse(request.body);

        const data = validationData as FuncionarioCreate;
        try {
            const result= await this.funcionarioService.criarFuncionario(data);
            return { status: 201, body: result };
        } catch (error) {
            return { status: 500, body: { message: 'Erro ao criar funcionário' } };
        }
    }

    // Atualizar um funcionário existente
    async atualizarFuncionario(request: Request): Promise<{ status: number; body: { message: string } }> {
        const { matricula } = request.params;
        const validationData = updateFuncionarioSchema.parse(request.body);

        const data = validationData as FuncionarioUpdate;
        try {
            const sucesso = await this.funcionarioService.atualizarFuncionario(Number(matricula), data);
            if (sucesso) {
                return { status: 200, body: { message: 'Funcionário atualizado com sucesso' } };
            } else {
                return { status: 404, body: { message: 'Funcionário não encontrado' } };
            }
        } catch (error) {
            return { status: 500, body: { message: 'Erro ao atualizar funcionário' } };
        }
    }

    // Buscar funcionário por matrícula
    async buscarFuncionarioPorMatricula(request: Request): Promise<{ status: number; body: any | { message: string } }> {
        const { matricula } = request.params;
        try {
            const funcionario = await this.funcionarioService.buscarFuncionarioPorMatricula(Number(matricula));
            if (funcionario) {
                return { status: 200, body: funcionario };
            } else {
                return { status: 404, body: { message: 'Funcionário não encontrado' } };
            }
        } catch (error) {
            return { status: 500, body: { message: 'Erro ao buscar funcionário' } };
        }
    }

    // Listar todos os funcionários
    async listarFuncionarios(): Promise<{ status: number; body: any[] | { message: string } }> {
        try {
            const funcionarios = await this.funcionarioService.listarFuncionarios();
            return { status: 200, body: funcionarios };
        } catch (error) {
            return { status: 500, body: { message: 'Erro ao listar funcionários' } };
        }
    }

    // Deletar um funcionário
    async deletarFuncionario(request: Request): Promise<{ status: number; body: { message: string } }> {
        const { matricula } = request.params;
        try {
            const sucesso = await this.funcionarioService.deletarFuncionario(Number(matricula));
            if (sucesso) {
                return { status: 200, body: { message: 'Funcionário deletado com sucesso' } };
            } else {
                return { status: 404, body: { message: 'Funcionário não encontrado' } };
            }
        } catch (error) {
            return { status: 500, body: { message: 'Erro ao deletar funcionário' } };
        }
    }
}