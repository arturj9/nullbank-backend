import { Conta } from '../@types/entities/Conta';
import pool from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

export default class ContaRepository {
    private tableName = 'conta';

    async findAll(): Promise<Conta[]> {
        const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM ${this.tableName}`);
        return rows as Conta[];
    }

    async findById(id: number): Promise<Conta | null> {
        const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM ${this.tableName} WHERE num_conta = ?`, [id]);
        return rows[0] as Conta || null;
    }

    async create(data: Omit<Conta, 'num_conta'>): Promise<number> {
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO ${this.tableName} SET ?`,
            [data]
        );
        return result.insertId;
    }

    async update(id: number, data: Partial<Conta>): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `UPDATE ${this.tableName} SET ? WHERE num_conta = ?`,
            [data, id]
        );
        return result.affectedRows > 0;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `DELETE FROM ${this.tableName} WHERE num_conta = ?`,
            [id]
        );
        return result.affectedRows > 0;
    }

    async findByAgencia(num_ag: number): Promise<Conta[]> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM ${this.tableName} WHERE num_ag = ?`,
            [num_ag]
        );
        return rows as Conta[];
    }
}