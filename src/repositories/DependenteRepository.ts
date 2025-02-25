import pool from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { Dependente } from '../@types/entities/Dependente';
import { DependenteCreate, DependenteUpdate } from '../utils/validation';

export default class DependenteRepository {
    private tableName = 'dependente';

    async find(): Promise<Dependente[]> {
        const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM ${this.tableName}`);
        return rows as Dependente[];
    }

    async findByPK(matricula: number, nome:string): Promise<Dependente | null> {
        const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM ${this.tableName} WHERE funcionario_matricula = ? AND nome_completo = ?`, [matricula, nome]);
        return rows[0] as Dependente || null;
    }

    async create(data: DependenteCreate): Promise<{ success: boolean; message?: string }> {
        try {
            const [result] = await pool.query<ResultSetHeader>(
                `INSERT INTO ${this.tableName} (nome_completo, data_nascimento, funcionario_matricula, parentesco) VALUES (?, ?, ?, ?)`,
                [data.nome_completo, data.data_nascimento, data.funcionario_matricula, data.parentesco]
            );
            return { success: true, message: "Dependente criado com sucesso."};
        } catch (error: any) {
            // Captura o erro lançado pelo trigger
            if (error.code === 'ER_SIGNAL_EXCEPTION' && error.sqlState === '45000') {
                return { success: false, message: error.message }; // Retorna a mensagem de erro
            }
            throw error; // Lança outros erros
        }
    }

    async update(matricula: number, nome:string, data: DependenteUpdate): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `UPDATE ${this.tableName} SET ? WHERE funcionario_matricula = ? AND nome_completo = ?`,
            [data, matricula, nome]
        );
        return result.affectedRows > 0;
    }

    async delete(matricula: number, nome:string): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `DELETE FROM ${this.tableName} WHERE funcionario_matricula = ? AND nome_completo = ?`,
            [matricula, nome]
        );
        return result.affectedRows > 0;
    }

    async findByFuncionario(funcionario_matriculaio: number): Promise<Dependente[]> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM ${this.tableName} WHERE funcionario_matricula = ?`,
            [funcionario_matriculaio]
        );
        return rows as Dependente[];
    }
}