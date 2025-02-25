import DependenteRepository from '../repositories/DependenteRepository';
import { Dependente } from '../@types/entities/Dependente';
import { DependenteCreate, DependenteUpdate } from '../utils/validation';

export default class DependenteService {
    private dependenteRepository: DependenteRepository;

    constructor() {
        this.dependenteRepository = new DependenteRepository();
    }

    async listarDependentes(): Promise<Dependente[]> {
        return this.dependenteRepository.find();
    }

    async buscarDependentePorId(matricula: number, nome:string): Promise<Dependente | null> {
        return this.dependenteRepository.findByPK(matricula, nome);
    }

    async criarDependente(data: DependenteCreate): Promise<{ success: boolean; message?: string }> {
        return this.dependenteRepository.create(data);
    }

    async atualizarDependente(matricula: number, nome:string, data: DependenteUpdate): Promise<boolean> {
        return this.dependenteRepository.update(matricula, nome, data);
    }

    async deletarDependente(matricula: number, nome:string): Promise<boolean> {
        return this.dependenteRepository.delete(matricula, nome);
    }

    async buscarDependentesPorFuncionario(funcionario_matricula: number): Promise<Dependente[]> {
        return this.dependenteRepository.findByFuncionario(funcionario_matricula);
    }
}