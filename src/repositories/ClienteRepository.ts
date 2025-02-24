import pool from '../config/db.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { Cliente } from '../@types/entities/Cliente.js';

export default class ClienteRepository {
    private tableName = 'cliente';

    // Busca todos os clientes
    async findAll(): Promise<Cliente[]> {
        const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM ${this.tableName}`);
        return rows as Cliente[];
    }

    // Busca um cliente pelo CPF
    async findByCpf(cpf: string): Promise<Cliente | null> {
        const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM ${this.tableName} WHERE cpf = ?`, [cpf]);
        return rows[0] as Cliente || null;
    }

    // Cria um novo cliente
    async create(data: Omit<Cliente, 'cpf'>): Promise<string> {
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO ${this.tableName} SET ?`,
            [data]
        );
        return result.insertId.toString();
    }

    // Atualiza um cliente existente
    async update(cpf: string, data: Partial<Cliente>): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `UPDATE ${this.tableName} SET ? WHERE cpf = ?`,
            [data, cpf]
        );
        return result.affectedRows > 0;
    }

    // Deleta um cliente pelo CPF
    async delete(cpf: string): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `DELETE FROM ${this.tableName} WHERE cpf = ?`,
            [cpf]
        );
        return result.affectedRows > 0;
    }

    // Busca clientes pelo nome
    async findByNome(nome: string): Promise<Cliente[]> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM ${this.tableName} WHERE nome_completo LIKE ?`,
            [`%${nome}%`]
        );
        return rows as Cliente[];
    }
}