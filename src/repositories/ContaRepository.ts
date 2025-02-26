import { Conta } from '../@types/entities/Conta';
import { ContaCorrente } from '../@types/entities/ContaCorrente';
import { ContaPoupanca } from '../@types/entities/ContaEspecial';
import { ContaHasCliente } from '../@types/entities/ContaHasCliente';
import { ContaEspecial } from '../@types/entities/ContaPoupanca';
import pool from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { ContaCorrenteCreate } from '../utils/validation';

export default class ContaRepository {
    private tableName = 'conta';

    async create(conta: Conta): Promise<Conta> {
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO ${this.tableName} (saldo, senha, tipo_conta, num_ag, gerente_matricula) VALUES (?, ?, ?, ?, ?)`,
            [conta.saldo, conta.senha, conta.tipo_conta, conta.num_ag, conta.gerente_matricula]
        );
        return {...conta, num_conta: result.insertId };
    }

    async createContaCorrente(contaCorrente: ContaCorrenteCreate): Promise<ContaCorrenteCreate> {
        const conta = await this.create(contaCorrente); // Cria a conta base
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO conta_corrente (num_conta, data_aniversario_contrato) VALUES (?, ?)`,
            [conta.num_conta, contaCorrente.data_aniversario_contrato]
        );
        return { ...contaCorrente };
    }

    async createContaPoupanca(contaPoupanca: ContaPoupanca): Promise<ContaPoupanca> {
        const conta = await this.create(contaPoupanca); // Cria a conta base
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO conta_poupanca (num_conta, taxa_juros) VALUES (?, ?)`,
            [conta.num_conta, contaPoupanca.taxa_juros]
        );
        return { ...contaPoupanca };
    }

    async createContaEspecial(contaEspecial: ContaEspecial): Promise<ContaEspecial> {
        const conta = await this.create(contaEspecial); // Cria a conta base
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO conta_especial (num_conta, limite_credito) VALUES (?, ?)`,
            [conta.num_conta, contaEspecial.limite_credito]
        );
        return { ...contaEspecial };
    }

    async findByNumConta(numConta: number): Promise<Conta | null> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM ${this.tableName} WHERE num_conta = ?`,
            [numConta]
        );
        return rows[0] as Conta || null;
    }

    async update(numConta: number, conta: Partial<Conta>): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `UPDATE ${this.tableName} SET ? WHERE num_conta = ?`,
            [conta, numConta]
        );
        return result.affectedRows > 0;
    }

    async delete(numConta: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `DELETE FROM ${this.tableName} WHERE num_conta = ?`,
            [numConta]
        );
        return result.affectedRows > 0;
    }

    async list(): Promise<Conta[]> {
        const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM ${this.tableName}`);
        return rows as Conta[];
    }

    async createContaHasCliente(contaHasCliente: ContaHasCliente): Promise<ContaHasCliente> {
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO conta_has_cliente (num_conta, cpf_cliente) VALUES (?, ?)`,
            [contaHasCliente.num_conta, contaHasCliente.cpf_cliente]
        );
        return { ...contaHasCliente };
    }

    async countClientesPorConta(numConta: number): Promise<number> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT COUNT(*) AS total FROM conta_has_cliente WHERE num_conta = ?`,
            [numConta]
        );
        return rows[0].total;
    }

    async countContasPorClienteEAgencia(cpfCliente: string, numAg: number): Promise<number> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT COUNT(*) AS total FROM conta_has_cliente chc
             JOIN conta c ON chc.num_conta = c.num_conta
             WHERE chc.cpf_cliente = ? AND c.num_ag = ?`,
            [cpfCliente, numAg]
        );
        return rows[0].total;
    }

    async listarContas(): Promise<(Conta | ContaCorrente | ContaPoupanca | ContaEspecial)[]> {
        const [rows] = await pool.query<RowDataPacket[]>(`
            SELECT c.*, cc.data_aniversario_contrato, cp.taxa_juros, ce.limite_credito
            FROM conta c
            LEFT JOIN conta_corrente cc ON c.num_conta = cc.num_conta
            LEFT JOIN conta_poupanca cp ON c.num_conta = cp.num_conta
            LEFT JOIN conta_especial ce ON c.num_conta = ce.num_conta
        `);

        return rows.map(row => {
            switch (row.tipo_conta) {
                case 'conta-corrente':
                    return {
                        ...row,
                        data_aniversario_contrato: row.data_aniversario_contrato,
                    } as ContaCorrente;
                case 'poupança':
                    return {
                        ...row,
                        taxa_juros: row.taxa_juros,
                    } as ContaPoupanca;
                case 'conta especial':
                    return {
                        ...row,
                        limite_credito: row.limite_credito,
                    } as ContaEspecial;
                default:
                    return row as Conta;
            }
        });
    }

    async listarContasPorCpf(cpfCliente: string): Promise<(Conta | ContaCorrente | ContaPoupanca | ContaEspecial)[]> {
        const [rows] = await pool.query<RowDataPacket[]>(`
            SELECT c.*, cc.data_aniversario_contrato, cp.taxa_juros, ce.limite_credito
            FROM conta c
            LEFT JOIN conta_corrente cc ON c.num_conta = cc.num_conta
            LEFT JOIN conta_poupanca cp ON c.num_conta = cp.num_conta
            LEFT JOIN conta_especial ce ON c.num_conta = ce.num_conta
            JOIN conta_has_cliente chc ON c.num_conta = chc.num_conta
            WHERE chc.cpf_cliente = ?
        `, [cpfCliente]);

        return rows.map(row => {
            switch (row.tipo_conta) {
                case 'conta-corrente':
                    return {
                        ...row,
                        data_aniversario_contrato: row.data_aniversario_contrato,
                    } as ContaCorrente;
                case 'poupança':
                    return {
                        ...row,
                        taxa_juros: row.taxa_juros,
                    } as ContaPoupanca;
                case 'conta especial':
                    return {
                        ...row,
                        limite_credito: row.limite_credito,
                    } as ContaEspecial;
                default:
                    return row as Conta;
            }
        });
    }
}