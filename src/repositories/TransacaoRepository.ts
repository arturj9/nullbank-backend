import { Transacao } from '../@types/entities/Transacao';
import pool from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

export default class TransacaoRepository {
    private tableName = 'transacao';

    async findAll(): Promise<Transacao[]> {
        const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM ${this.tableName}`);
        return rows as Transacao[];
    }

    async findById(id: number): Promise<Transacao | null> {
        const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM ${this.tableName} WHERE num_transacao = ?`, [id]);
        return rows[0] as Transacao || null;
    }

    async create(data: Omit<Transacao, 'num_transacao'>): Promise<number> {
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO ${this.tableName} SET ?`,
            [data]
        );
        return result.insertId;
    }

    async update(id: number, data: Partial<Transacao>): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `UPDATE ${this.tableName} SET ? WHERE num_transacao = ?`,
            [data, id]
        );
        return result.affectedRows > 0;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `DELETE FROM ${this.tableName} WHERE num_transacao = ?`,
            [id]
        );
        return result.affectedRows > 0;
    }

    async findByConta(num_conta: number): Promise<Transacao[]> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM ${this.tableName} WHERE num_conta = ?`,
            [num_conta]
        );
        return rows as Transacao[];
    }
}