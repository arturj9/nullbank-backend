import ClienteRepository from '../repositories/ClienteRepository.js';
import { Cliente } from '../@types/entities/Cliente.js';

export default class ClienteService {
    private clienteRepository: ClienteRepository;

    constructor() {
        this.clienteRepository = new ClienteRepository();
    }

    async listarClientes(): Promise<Cliente[]> {
        return this.clienteRepository.findAll();
    }

    async buscarClientePorCpf(cpf: string): Promise<Cliente | null> {
        return this.clienteRepository.findById(cpf);
    }

    async criarCliente(data: Omit<Cliente, 'cpf'>): Promise<string> {
        return this.clienteRepository.create(data);
    }

    async atualizarCliente(cpf: string, data: Partial<Cliente>): Promise<boolean> {
        return this.clienteRepository.update(cpf, data);
    }

    async deletarCliente(cpf: string): Promise<boolean> {
        return this.clienteRepository.delete(cpf);
    }

    async buscarClientesPorNome(nome: string): Promise<Cliente[]> {
        return this.clienteRepository.findByNome(nome);
    }
}