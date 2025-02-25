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
        return this.findById(result.insertId); // Retorna o funcionário sem a senha
    }

    // Atualizar um funcionário existente
    async update(matricula: number, data: FuncionarioUpdate): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `UPDATE ${this.tableName} SET ? WHERE matricula = ?`,
            [data, matricula]
        );
        return result.affectedRows > 0;
    }

    // Buscar funcionário por matrícula (sem senha)
    async findById(matricula: number): Promise<Funcionario | null> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT matricula, nome_completo, endereco, cidade, cargo, genero, data_nascimento, salario, num_ag FROM ${this.tableName} WHERE matricula = ?`,
            [matricula]
        );
        return rows[0] as Funcionario || null;
    }

    // Listar todos os funcionários (sem senha)
    async findAll(): Promise<RowDataPacket[]> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT matricula, nome_completo, endereco, cidade, cargo, genero, data_nascimento, salario, num_ag FROM ${this.tableName}`
        );
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