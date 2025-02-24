export interface TelefoneCliente {
    telefone: string; // Número do telefone (chave primária composta)
    cpf_cliente: string; // CPF do cliente (chave estrangeira)
    tipo: string; // Tipo de telefone (celular, residencial, etc.)
}