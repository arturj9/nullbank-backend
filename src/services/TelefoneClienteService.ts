import TelefoneClienteRepository from '../repositories/TelefoneClienteRepository';
import { TelefoneCliente } from '../@types/entities/TelefoneCliente';

export default class TelefoneClienteService {
    private telefoneClienteRepository: TelefoneClienteRepository;

    constructor() {
        this.telefoneClienteRepository = new TelefoneClienteRepository();
    }

    async criarTelefoneCliente(telefoneCliente: TelefoneCliente): Promise<TelefoneCliente> {
        return this.telefoneClienteRepository.create(telefoneCliente);
    }

    async buscarTelefonesPorCliente(cpfCliente: string): Promise<TelefoneCliente[]> {
        return this.telefoneClienteRepository.findByCpfCliente(cpfCliente);
    }

    async atualizarTelefoneCliente(telefone: string, cpfCliente: string, telefoneCliente: Partial<TelefoneCliente>): Promise<boolean> {
        return this.telefoneClienteRepository.update(telefone, cpfCliente, telefoneCliente);
    }

    async deletarTelefoneCliente(telefone: string, cpfCliente: string): Promise<boolean> {
        return this.telefoneClienteRepository.delete(telefone, cpfCliente);
    }
}