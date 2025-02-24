import { Funcionario } from '../@types/entities/Funcionario.js';
import FuncionarioRepository from '../repositories/FuncionarioRepository.js';
import { FuncionarioCreate, FuncionarioUpdate } from '../utils/validation.js';

export default class FuncionarioService {
    private funcionarioRepository: FuncionarioRepository;

    constructor() {
        this.funcionarioRepository = new FuncionarioRepository();
    }

    // Criar um novo funcionário
    async criarFuncionario(data: FuncionarioCreate): Promise<Funcionario | null> {
        return this.funcionarioRepository.create(data);
    }

    // Atualizar um funcionário existente
    async atualizarFuncionario(matricula: number, data: FuncionarioUpdate): Promise<boolean> {
        return this.funcionarioRepository.update(matricula, data);
    }

    // Buscar funcionário por matrícula
    async buscarFuncionarioPorMatricula(matricula: number): Promise<any | null> {
        return this.funcionarioRepository.findById(matricula);
    }

    // Listar todos os funcionários
    async listarFuncionarios(): Promise<any[]> {
        return this.funcionarioRepository.findAll();
    }

    // Deletar um funcionário
    async deletarFuncionario(matricula: number): Promise<boolean> {
        return this.funcionarioRepository.delete(matricula);
    }
}