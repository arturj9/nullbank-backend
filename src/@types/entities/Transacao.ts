export interface Transacao {
    num_transacao: number; // Número da transação (chave primária)
    tipo_transacao: 'saque' | 'depósito' | 'pagamento' | 'estorno' | 'transferência' | 'PIX'; // Tipo da transação
    data_hora: Date; // Data e hora da transação
    valor: number; // Valor da transação
    num_conta: number; // Número da conta (chave estrangeira)
}