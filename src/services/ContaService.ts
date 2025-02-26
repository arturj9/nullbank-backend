import { Conta } from '../@types/entities/Conta';
import { ContaCorrente } from '../@types/entities/ContaCorrente';
import { ContaPoupanca } from '../@types/entities/ContaEspecial';
import { ContaHasCliente } from '../@types/entities/ContaHasCliente';
import { ContaEspecial } from '../@types/entities/ContaPoupanca';
import ContaRepository from '../repositories/ContaRepository';
import { encryptPassword } from '../utils/hash';
import { ContaUnificadaCreate, ContaCorrenteCreate, ContaPoupancaCreate, ContaEspecialCreate } from '../utils/validation';

export default class ContaService {
    private contaRepository: ContaRepository;

    constructor() {
        this.contaRepository = new ContaRepository();
    }

    async criarConta(conta: ContaUnificadaCreate): Promise<ContaCorrenteCreate | ContaPoupanca | ContaEspecial> {
        const senhaCriptografada = encryptPassword(conta.senha); // Criptografa a senha
        conta = { ...conta, senha: senhaCriptografada }; // Substitui a senha pelo hash
        switch (conta.tipo_conta) {
            case 'conta-corrente':
                return this.contaRepository.createContaCorrente(conta as ContaCorrenteCreate);
            case 'poupança':
                return this.contaRepository.createContaPoupanca(conta as ContaPoupancaCreate);
            case 'conta especial':
                return this.contaRepository.createContaEspecial(conta as ContaEspecialCreate);
            default:
                throw new Error('Tipo de conta inválido.');
        }
    }

    async adicionarClienteAConta(contaHasCliente: ContaHasCliente): Promise<ContaHasCliente> {
        // Verifica se a conta já tem 2 clientes
        const totalClientes = await this.contaRepository.countClientesPorConta(contaHasCliente.num_conta);
        if (totalClientes >= 2) {
            throw new Error('Uma conta conjunta não pode ter mais de 2 clientes.');
        }

        // Verifica se o cliente já tem uma conta na mesma agência
        const totalContas = await this.contaRepository.countContasPorClienteEAgencia(contaHasCliente.cpf_cliente, contaHasCliente.num_conta);
        if (totalContas >= 1) {
            throw new Error('Um cliente não pode ter mais de uma conta na mesma agência.');
        }

        return this.contaRepository.createContaHasCliente(contaHasCliente);
    }

    async listarContas(): Promise<(Conta | ContaCorrente | ContaPoupanca | ContaEspecial)[]> {
        return this.contaRepository.listarContas();
    }

    async listarContasPorCpf(cpfCliente: string): Promise<(Conta | ContaCorrente | ContaPoupanca | ContaEspecial)[]> {
        return this.contaRepository.listarContasPorCpf(cpfCliente);
    }
}