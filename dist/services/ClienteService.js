import ClienteRepository from '../repositories/ClienteRepository.js';
export default class ClienteService {
    constructor() {
        this.clienteRepository = new ClienteRepository();
    }
    async listarClientes() {
        return this.clienteRepository.findAll();
    }
    async buscarClientePorCpf(cpf) {
        return this.clienteRepository.findByCpf(cpf);
    }
    async criarCliente(data) {
        return this.clienteRepository.create(data);
    }
    async atualizarCliente(cpf, data) {
        return this.clienteRepository.update(cpf, data);
    }
    async deletarCliente(cpf) {
        return this.clienteRepository.delete(cpf);
    }
    async buscarClientesPorNome(nome) {
        return this.clienteRepository.findByNome(nome);
    }
}
