import AgenciaService from '../services/AgenciaService.js';
import { updateAgenciaSchema, createAgenciaSchema } from '../utils/validation.js';
import { AppError } from '../errors/AppError.js';
export default class AgenciaController {
    constructor() {
        this.agenciaService = new AgenciaService();
    }
    // Criar uma nova agência
    async criarAgencia(request) {
        // Valida os dados de entrada
        const validationData = createAgenciaSchema.parse(request.body);
        const data = validationData;
        try {
            const result = await this.agenciaService.criarAgencia(data);
            return { status: 201, body: result };
        }
        catch (error) {
            return { status: 500, body: { message: 'Erro ao criar agência' } };
        }
    }
    // Atualizar uma agência existente
    async atualizarAgencia(request) {
        const { id } = request.params;
        // Valida os dados de entrada
        const validationData = updateAgenciaSchema.parse(request.body);
        const data = validationData;
        try {
            const sucesso = await this.agenciaService.atualizarAgencia(Number(id), data);
            if (sucesso) {
                return { status: 200, body: { message: 'Agência atualizada com sucesso' } };
            }
            else {
                return { status: 404, body: { message: 'Agência não encontrada' } };
            }
        }
        catch (error) {
            return { status: 500, body: { message: 'Erro ao atualizar agência' } };
        }
    }
    // Buscar agência por ID
    async buscarAgenciaPorId(request) {
        const { id } = request.params;
        try {
            const agencia = await this.agenciaService.buscarAgenciaPorId(Number(id));
            if (agencia) {
                return { status: 200, body: agencia };
            }
            else {
                return { status: 404, body: { message: 'Agência não encontrada' } };
            }
        }
        catch (error) {
            return { status: 500, body: { message: 'Erro ao buscar agência' } };
        }
    }
    // Listar agências
    async list(request) {
        try {
            const { cidade, page, limit } = request.query;
            const pageNumber = page ? parseInt(page, 10) : 1;
            const limitNumber = limit ? parseInt(limit, 10) : 10;
            if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
                throw new AppError("Parâmetros de paginação inválidos.", 400);
            }
            const agencias = await this.agenciaService.listarAgencias(cidade, pageNumber, limitNumber);
            return { status: 200, body: agencias };
        }
        catch (error) {
            throw new AppError("Erro ao listar agências.");
        }
    }
    // Deletar uma agência
    async deletarAgencia(request) {
        const { id } = request.params;
        try {
            const sucesso = await this.agenciaService.deletarAgencia(Number(id));
            if (sucesso) {
                return { status: 200, body: { message: 'Agência deletada com sucesso' } };
            }
            else {
                return { status: 404, body: { message: 'Agência não encontrada' } };
            }
        }
        catch (error) {
            throw new AppError('Erro ao deletar agência');
        }
    }
}
