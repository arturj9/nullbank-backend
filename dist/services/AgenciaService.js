import AgenciaRepository from '../repositories/AgenciaRepository';
export default class AgenciaService {
    constructor() {
        this.agenciaRepository = new AgenciaRepository();
    }
    async listarAgencias(cidade, page = 1, limit = 10) {
        return this.agenciaRepository.find(cidade, page, limit);
    }
    async buscarAgenciaPorId(id) {
        return this.agenciaRepository.findById(id);
    }
    async criarAgencia(data) {
        return this.agenciaRepository.create(data);
    }
    async atualizarAgencia(id, data) {
        return this.agenciaRepository.update(id, data);
    }
    async deletarAgencia(id) {
        return this.agenciaRepository.delete(id);
    }
    async buscarAgenciasPorCidade(cidade) {
        return this.agenciaRepository.findByCidade(cidade);
    }
}
