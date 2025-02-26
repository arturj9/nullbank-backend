import { Conta } from "./Conta";

export interface ContaCorrente extends Conta {
    data_aniversario_contrato: Date; // Data de aniversário do contrato
}