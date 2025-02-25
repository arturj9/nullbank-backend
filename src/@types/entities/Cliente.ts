export interface Cliente {
    cpf: string;
    nome_completo: string;
    rg: string;
    orgao_emissor: string;
    uf_rg: string;
    data_nascimento: Date;
    tipo_logradouro: string; // Tipo de logradouro (Rua, Avenida, etc.)
    nome_logradouro: string; // Nome do logradouro
    numero: string; // Número do endereço
    bairro: string; // Bairro
    cep: string; // CEP
    cidade: string; // Cidade
    estado: string; // Estado (UF)
}