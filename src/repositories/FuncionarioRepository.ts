import pool from '../config/db.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { FuncionarioCreate, FuncionarioUpdate } from '../utils/validation.js';
import { Funcionario } from '../@types/entities/Funcionario.js';

export default class FuncionarioRepository {
    private tableName = 'funcionario';

    // Criar um novo funcionário
    async create(data: FuncionarioCreate): Promise<Funcionario | null> {
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO ${this.tableName} SET ?`,
            [data]
        );
        return this.findById(result.insertId);
    }

    // Atualizar um funcionário existente
    async update(matricula: number, data: FuncionarioUpdate): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `UPDATE ${this.tableName} SET ? WHERE matricula = ?`,
            [data, matricula]
        );
        return result.affectedRows > 0;
    }

    // Buscar funcionário por matrícula
    async findById(matricula: number): Promise<Funcionario| null> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM ${this.tableName} WHERE matricula = ?`,
            [matricula]
        );
        return rows[0] as Funcionario || null;
    }

    // Listar todos os funcionários
    async findAll(): Promise<RowDataPacket[]> {
        const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM ${this.tableName}`);
        return rows;
    }

    // Deletar um funcionário
    async delete(matricula: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `DELETE FROM ${this.tableName} WHERE matricula = ?`,
            [matricula]
        );
        return result.affectedRows > 0;
    }
}