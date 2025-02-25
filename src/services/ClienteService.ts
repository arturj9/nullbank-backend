import ClienteRepository from '../repositories/ClienteRepository';
import { Cliente } from '../@types/entities/Cliente';
import { ClienteCreate, ClienteUpdate } from '../utils/validation';

export default class ClienteService {
    private clienteRepository: ClienteRepository;

    constructor() {
        this.clienteRepository = new ClienteRepository();
    }

    async criarCliente(cliente: ClienteCreate): Promise<ClienteCreate> {
        return this.clienteRepository.create(cliente);
    }

    async buscarClientePorCpf(cpf: string): Promise<Cliente | null> {
        return this.clienteRepository.findByCpf(cpf);
    }

    async atualizarCliente(cpf: string, cliente: Partial<ClienteUpdate>): Promise<boolean> {
        return this.clienteRepository.update(cpf, cliente);
    }

    async deletarCliente(cpf: string): Promise<boolean> {
        return this.clienteRepository.delete(cpf);
    }

    async listarClientes(): Promise<Cliente[]> {
        return this.clienteRepository.list();
    }
}