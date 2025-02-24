import AgenciaRepository from '../repositories/AgenciaRepository';
import { Agencia } from '../@types/entities/Agencia';

export default class AgenciaService {
    private agenciaRepository: AgenciaRepository;

    constructor() {
        this.agenciaRepository = new AgenciaRepository();
    }

    async listarAgencias(cidade?: string, page: number = 1, limit: number = 10): Promise<Agencia[]> {
        return this.agenciaRepository.find(cidade, page, limit);
    }

    async buscarAgenciaPorId(id: number): Promise<Agencia | null> {
        return this.agenciaRepository.findById(id);
    }

    async criarAgencia(data: Omit<Agencia, 'num_ag' | 'sal_total'>): Promise<Agencia | null> {
        return this.agenciaRepository.create(data);
    }

    async atualizarAgencia(id: number, data: Partial<Agencia>): Promise<boolean> {
        return this.agenciaRepository.update(id, data);
    }

    async deletarAgencia(id: number): Promise<boolean> {
        return this.agenciaRepository.delete(id);
    }

    async buscarAgenciasPorCidade(cidade: string): Promise<Agencia[]> {
        return this.agenciaRepository.findByCidade(cidade);
    }
}