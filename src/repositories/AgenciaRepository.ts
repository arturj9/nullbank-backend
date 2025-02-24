import pool from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { Agencia } from '../@types/entities/Agencia';

export default class AgenciaRepository {
    private tableName = 'agencia';

    async find(cidade?: string, page: number = 1, limit: number = 10): Promise<Agencia[]> {
        const offset = (page - 1) * limit; // Calcula o deslocamento
    
        let query = `SELECT * FROM ${this.tableName}`;
        let params: any[] = [];
    
        if (cidade) {
            query += ` WHERE cidade = ?`;
            params.push(cidade);
        }
    
        query += ` LIMIT ? OFFSET ?`;
        params.push(limit, offset);
    
        const [rows] = await pool.query<RowDataPacket[]>(query, params);
        return rows as Agencia[];
    }
    

    async findById(id: number): Promise<Agencia | null> {
        const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM ${this.tableName} WHERE num_ag = ?`, [id]);
        return rows[0] as Agencia || null;
    }

    async create(data: Omit<Agencia, 'num_ag' | 'sal_total'>): Promise<Agencia | null> {
        const [result] = await pool.query<ResultSetHeader>(
           `INSERT INTO ${this.tableName} (nome_ag, cidade) VALUES (?, ?)`,
        [data.nome_ag, data.cidade]
        );
        return this.findById(result.insertId)
    }

    async update(id: number, data: Partial<Agencia>): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `UPDATE ${this.tableName} SET ? WHERE num_ag = ?`,
            [data, id]
        );
        return result.affectedRows > 0;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `DELETE FROM ${this.tableName} WHERE num_ag = ?`,
            [id]
        );
        return result.affectedRows > 0;
    }

    async findByCidade(cidade: string): Promise<Agencia[]> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM ${this.tableName} WHERE cidade = ?`,
            [cidade]
        );
        return rows as Agencia[];
    }
}