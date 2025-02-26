import { Conta } from "./Conta";

export interface ContaPoupanca extends Conta {
    taxa_juros: number; // Taxa de juros da poupança
}