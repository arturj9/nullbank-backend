export interface Funcionario {
    matricula: number; // Matrícula do funcionário (chave primária)
    nome_completo: string; // Nome completo do funcionário
    senha: string; // Senha do funcionário
    endereco: string; // Endereço do funcionário
    cidade: string; // Cidade do funcionário
    cargo: 'gerente' | 'atendente' | 'caixa'; // Cargo do funcionário
    genero: 'masculino' | 'feminino' | 'não-binário'; // Gênero do funcionário
    data_nascimento: Date; // Data de nascimento do funcionário
    salario: number; // Salário do funcionário
    num_ag: number; // Número da agência (chave estrangeira)
}