import { z } from 'zod';

// Esquema para Cliente
export const createClienteSchema = z.object({
    cpf: z.string().length(11, 'CPF deve ter 11 caracteres'),
    nome_completo: z.string().min(1, 'Nome completo é obrigatório'),
    rg: z.string().min(1, 'RG é obrigatório'),
    orgao_emissor: z.string().min(1, 'Órgão emissor é obrigatório'),
    uf_rg: z.string().length(2, 'UF do RG deve ter 2 caracteres'),
    data_nascimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data de nascimento deve estar no formato YYYY-MM-DD'),
});

export const updateClienteSchema = z.object({
    nome_completo: z.string().min(1, 'Nome completo é obrigatório').optional(),
    rg: z.string().min(1, 'RG é obrigatório').optional(),
    orgao_emissor: z.string().min(1, 'Órgão emissor é obrigatório').optional(),
    uf_rg: z.string().length(2, 'UF do RG deve ter 2 caracteres').optional(),
    data_nascimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data de nascimento deve estar no formato YYYY-MM-DD').optional(),
});

// Esquema para Funcionario
export const createFuncionarioSchema = z.object({
    matricula: z.number().int().positive('Matrícula deve ser um número positivo'),
    nome_completo: z.string().min(1, 'Nome completo é obrigatório'),
    senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    endereco: z.string().min(1, 'Endereço é obrigatório'),
    cidade: z.string().min(1, 'Cidade é obrigatória'),
    cargo: z.enum(['gerente', 'atendente', 'caixa']),
    genero: z.enum(['masculino', 'feminino', 'não-binário']),
    data_nascimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data de nascimento deve estar no formato YYYY-MM-DD'),
    salario: z.number().positive('Salário deve ser um número positivo'),
    num_ag: z.number().int().positive('Número da agência deve ser um número positivo'),
});

export const updateFuncionarioSchema = z.object({
    nome_completo: z.string().min(1, 'Nome completo é obrigatório').optional(),
    senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres').optional(),
    endereco: z.string().min(1, 'Endereço é obrigatório').optional(),
    cidade: z.string().min(1, 'Cidade é obrigatória').optional(),
    cargo: z.enum(['gerente', 'atendente', 'caixa']).optional(),
    genero: z.enum(['masculino', 'feminino', 'não-binário']).optional(),
    data_nascimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data de nascimento deve estar no formato YYYY-MM-DD').optional(),
    salario: z.number().positive('Salário deve ser um número positivo').optional(),
    num_ag: z.number().int().positive('Número da agência deve ser um número positivo').optional(),
});

// Esquema para Transacao
export const createTransacaoSchema = z.object({
    tipo_transacao: z.enum(['saque', 'depósito', 'pagamento', 'estorno', 'transferência', 'PIX']),
    valor: z.number().positive('Valor deve ser um número positivo'),
    num_conta: z.number().int().positive('Número da conta deve ser um número positivo'),
});

export const updateTransacaoSchema = z.object({
    tipo_transacao: z.enum(['saque', 'depósito', 'pagamento', 'estorno', 'transferência', 'PIX']).optional(),
    valor: z.number().positive('Valor deve ser um número positivo').optional(),
    num_conta: z.number().int().positive('Número da conta deve ser um número positivo').optional(),
});

// Esquema para Agencia
export const createAgenciaSchema = z.object({
    nome_ag: z.string().min(1, 'Nome da agência é obrigatório'),
    cidade: z.string().min(1, 'Cidade é obrigatória'),
});

export const updateAgenciaSchema = z.object({
    nome_ag: z.string().min(1, 'Nome da agência é obrigatório').optional(),
    cidade: z.string().min(1, 'Cidade é obrigatória').optional(),
});


// Tipos inferidos dos esquemas
export type AgenciaCreate = z.infer<typeof createAgenciaSchema>;
export type AgenciaUpdate = z.infer<typeof updateAgenciaSchema>;

export type ClienteCreate = z.infer<typeof createClienteSchema>;
export type ClienteUpdate = z.infer<typeof updateClienteSchema>;

export type FuncionarioCreate = z.infer<typeof createFuncionarioSchema>;
export type FuncionarioUpdate = z.infer<typeof updateFuncionarioSchema>;

export type TransacaoCreate = z.infer<typeof createTransacaoSchema>;
export type TransacaoUpdate = z.infer<typeof updateTransacaoSchema>;