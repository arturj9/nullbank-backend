import EmailClienteRepository from '../repositories/EmailClienteRepository';
import { EmailCliente } from '../@types/entities/EmailCliente';

export default class EmailClienteService {
    private emailClienteRepository: EmailClienteRepository;

    constructor() {
        this.emailClienteRepository = new EmailClienteRepository();
    }

    async criarEmailCliente(emailCliente: EmailCliente): Promise<EmailCliente> {
        return this.emailClienteRepository.create(emailCliente);
    }

    async buscarEmailsPorCliente(cpfCliente: string): Promise<EmailCliente[]> {
        return this.emailClienteRepository.findByCpfCliente(cpfCliente);
    }

    async atualizarEmailCliente(email: string, cpfCliente: string, emailCliente: Partial<EmailCliente>): Promise<boolean> {
        return this.emailClienteRepository.update(email, cpfCliente, emailCliente);
    }

    async deletarEmailCliente(email: string, cpfCliente: string): Promise<boolean> {
        return this.emailClienteRepository.delete(email, cpfCliente);
    }
}