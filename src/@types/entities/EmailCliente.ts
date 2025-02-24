export interface EmailCliente {
    email: string; // Endereço de e-mail (chave primária composta)
    cpf_cliente: string; // CPF do cliente (chave estrangeira)
    tipo: string; // Tipo de e-mail (pessoal, corporativo, etc.)
}