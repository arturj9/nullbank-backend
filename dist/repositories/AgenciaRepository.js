import pool from '../config/db';
export default class AgenciaRepository {
    constructor() {
        this.tableName = 'agencia';
    }
    async find(cidade, page = 1, limit = 10) {
        const offset = (page - 1) * limit; // Calcula o deslocamento
        let query = `SELECT * FROM ${this.tableName}`;
        let params = [];
        if (cidade) {
            query += ` WHERE cidade = ?`;
            params.push(cidade);
        }
        query += ` LIMIT ? OFFSET ?`;
        params.push(limit, offset);
        const [rows] = await pool.query(query, params);
        return rows;
    }
    async findById(id) {
        const [rows] = await pool.query(`SELECT * FROM ${this.tableName} WHERE num_ag = ?`, [id]);
        return rows[0] || null;
    }
    async create(data) {
        const [result] = await pool.query(`INSERT INTO ${this.tableName} (nome_ag, cidade) VALUES (?, ?)`, [data.nome_ag, data.cidade]);
        return this.findById(result.insertId);
    }
    async update(id, data) {
        const [result] = await pool.query(`UPDATE ${this.tableName} SET ? WHERE num_ag = ?`, [data, id]);
        return result.affectedRows > 0;
    }
    async delete(id) {
        const [result] = await pool.query(`DELETE FROM ${this.tableName} WHERE num_ag = ?`, [id]);
        return result.affectedRows > 0;
    }
    async findByCidade(cidade) {
        const [rows] = await pool.query(`SELECT * FROM ${this.tableName} WHERE cidade = ?`, [cidade]);
        return rows;
    }
}
