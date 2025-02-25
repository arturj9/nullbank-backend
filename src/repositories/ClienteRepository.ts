import pool from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { Cliente } from '../@types/entities/Cliente';
import { ClienteCreate, ClienteUpdate } from '../utils/validation';

export default class ClienteRepository {
    private tableName = 'cliente';

    async create(cliente: ClienteCreate): Promise<ClienteCreate> {
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO ${this.tableName} (
                cpf, nome_completo, rg, orgao_emissor, uf_rg, data_nascimento,
                tipo_logradouro, nome_logradouro, numero, bairro, cep, cidade, estado
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                cliente.cpf, cliente.nome_completo, cliente.rg, cliente.orgao_emissor, cliente.uf_rg, cliente.data_nascimento,
                cliente.tipo_logradouro, cliente.nome_logradouro, cliente.numero, cliente.bairro, cliente.cep, cliente.cidade, cliente.estado
            ]
        );
        return { ...cliente };
    }

    async findByCpf(cpf: string): Promise<Cliente | null> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM ${this.tableName} WHERE cpf = ?`,
            [cpf]
        );
        return rows[0] as Cliente || null;
    }

    async update(cpf: string, cliente: Partial<ClienteUpdate>): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `UPDATE ${this.tableName} SET ? WHERE cpf = ?`,
            [cliente, cpf]
        );
        return result.affectedRows > 0;
    }

    async delete(cpf: string): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `DELETE FROM ${this.tableName} WHERE cpf = ?`,
            [cpf]
        );
        return result.affectedRows > 0;
    }

    async list(): Promise<Cliente[]> {
        const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM ${this.tableName}`);
        return rows as Cliente[];
    }
}