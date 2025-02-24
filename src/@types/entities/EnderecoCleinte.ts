export interface EnderecoCliente {
    id_endereco: number; // ID do endereço (chave primária)
    cpf_cliente: string; // CPF do cliente (chave estrangeira)
    tipo_logradouro: string; // Tipo de logradouro (Rua, Avenida, etc.)
    nome_logradouro: string; // Nome do logradouro
    numero: string; // Número do endereço
    bairro: string; // Bairro
    cep: string; // CEP
    cidade: string; // Cidade
    estado: string; // Estado (UF)
}