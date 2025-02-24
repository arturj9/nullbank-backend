export interface Conta {
    num_conta: number; // Número da conta (chave primária)
    saldo: number; // Saldo da conta
    senha: string; // Senha da conta
    tipo_conta: 'conta-corrente' | 'poupança' | 'conta especial'; // Tipo da conta
    num_ag: number; // Número da agência (chave estrangeira)
    gerente_matricula: number; // Matrícula do gerente (chave estrangeira)
}