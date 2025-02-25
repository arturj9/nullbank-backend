import { Funcionario } from '../@types/entities/Funcionario';
import FuncionarioRepository from '../repositories/FuncionarioRepository';
import { FuncionarioCreate, FuncionarioUpdate } from '../utils/validation';
import { hashSync } from 'bcrypt';

export default class FuncionarioService {
    private funcionarioRepository: FuncionarioRepository;

    constructor() {
        this.funcionarioRepository = new FuncionarioRepository();
    }

    // Criptografar a senha
    private encryptPassword(password: string): string {
        return hashSync(password, 10); // 10 é o número de rounds (salt)
    }

    // Criar um novo funcionário
    async criarFuncionario(data: FuncionarioCreate): Promise<Funcionario | null> {
        const senhaCriptografada = this.encryptPassword(data.senha); // Criptografa a senha
        const funcionarioData = { ...data, senha: senhaCriptografada }; // Substitui a senha pelo hash
        return this.funcionarioRepository.create(funcionarioData);
    }

    // Atualizar um funcionário existente
    async atualizarFuncionario(matricula: number, data: FuncionarioUpdate): Promise<boolean> {
        if (data.senha) {
            const senhaCriptografada = this.encryptPassword(data.senha); // Criptografa a nova senha
            data.senha = senhaCriptografada;
        }
        return this.funcionarioRepository.update(matricula, data);
    }

    // Buscar funcionário por matrícula (sem senha)
    async buscarFuncionarioPorMatricula(matricula: number): Promise<Funcionario | null> {
        return this.funcionarioRepository.findById(matricula);
    }

    // Listar todos os funcionários (sem senha)
    async listarFuncionarios(): Promise<Funcionario[]> {
        return this.funcionarioRepository.findAll() as Promise<Funcionario[]>;
    }

    // Deletar um funcionário
    async deletarFuncionario(matricula: number): Promise<boolean> {
        return this.funcionarioRepository.delete(matricula);
    }
}