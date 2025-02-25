import { Request } from 'express';
import EmailClienteService from '../services/EmailClienteService';
import { EmailClienteCreate, EmailClienteUpdate, createEmailClienteSchema, updateEmailClienteSchema } from '../utils/validation';
import { EmailCliente } from '../@types/entities/EmailCliente';

export default class EmailClienteController {
    private emailClienteService: EmailClienteService;

    constructor() {
        this.emailClienteService = new EmailClienteService();
    }

    async criarEmailCliente(request: Request): Promise<{ status: number; body: EmailCliente | { message: string } }> {
        try {
            const validationData = createEmailClienteSchema.parse(request.body);
            const emailCliente = await this.emailClienteService.criarEmailCliente(validationData as EmailClienteCreate);
            return { status: 201, body: emailCliente };
        } catch (error) {
            return { status: 500, body: { message: 'Erro ao criar e-mail do cliente.' } };
        }
    }

    async buscarEmailsPorCliente(request: Request): Promise<{ status: number; body: EmailCliente[] | { message: string } }> {
        const { cpfCliente } = request.params;

        try {
            const emails = await this.emailClienteService.buscarEmailsPorCliente(cpfCliente);
            return { status: 200, body: emails };
        } catch (error) {
            return { status: 500, body: { message: 'Erro ao buscar e-mails do cliente.' } };
        }
    }

    async atualizarEmailCliente(request: Request): Promise<{ status: number; body: { message: string } }> {
        const { email, cpfCliente } = request.params;

        try {
            const validationData = updateEmailClienteSchema.parse(request.body);
            const sucesso = await this.emailClienteService.atualizarEmailCliente(email, cpfCliente, validationData as EmailClienteUpdate);
            if (sucesso) {
                return { status: 200, body: { message: 'E-mail do cliente atualizado com sucesso.' } };
            } else {
                return { status: 404, body: { message: 'E-mail do cliente não encontrado.' } };
            }
        } catch (error) {
            return { status: 500, body: { message: 'Erro ao atualizar e-mail do cliente.' } };
        }
    }

    async deletarEmailCliente(request: Request): Promise<{ status: number; body: { message: string } }> {
        const { email, cpfCliente } = request.params;

        try {
            const sucesso = await this.emailClienteService.deletarEmailCliente(email, cpfCliente);
            if (sucesso) {
                return { status: 200, body: { message: 'E-mail do cliente deletado com sucesso.' } };
            } else {
                return { status: 404, body: { message: 'E-mail do cliente não encontrado.' } };
            }
        } catch (error) {
            return { status: 500, body: { message: 'Erro ao deletar e-mail do cliente.' } };
        }
    }
}