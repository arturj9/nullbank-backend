import { Funcionario } from '../@types/entities/Funcionario';
import pool from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

export default class FuncionarioRepository {
    private tableName = 'funcionario';

    async findAll(): Promise<Funcionario[]> {
        const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM ${this.tableName}`);
        return rows as Funcionario[];
    }

    async findById(id: number): Promise<Funcionario | null> {
        const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM ${this.tableName} WHERE matricula = ?`, [id]);
        return rows[0] as Funcionario || null;
    }

    async create(data: Omit<Funcionario, 'matricula'>): Promise<number> {
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO ${this.tableName} SET ?`,
            [data]
        );
        return result.insertId;
    }

    async update(id: number, data: Partial<Funcionario>): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `UPDATE ${this.tableName} SET ? WHERE matricula = ?`,
            [data, id]
        );
        return result.affectedRows > 0;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `DELETE FROM ${this.tableName} WHERE matricula = ?`,
            [id]
        );
        return result.affectedRows > 0;
    }

    async findByCargo(cargo: string): Promise<Funcionario[]> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM ${this.tableName} WHERE cargo = ?`,
            [cargo]
        );
        return rows as Funcionario[];
    }
}