export interface Dependente {
    funcionario_matricula: number; // Matrícula do funcionário (chave primária composta)
    nome_completo: string; // Nome completo do dependente (chave primária composta)
    data_nascimento: Date; // Data de nascimento do dependente
    parentesco: 'filho(a)' | 'cônjuge' | 'genitor(a)'; // Parentesco do dependente
    idade: number; // Idade do dependente
}