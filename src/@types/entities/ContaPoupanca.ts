import { Conta } from "./Conta";

export interface ContaEspecial extends Conta{
    limite_credito: number; // Limite de crédito da conta especial
}