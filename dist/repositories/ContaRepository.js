import pool from '../config/db';
export default class ContaRepository {
    constructor() {
        this.tableName = 'conta';
    }
    async findAll() {
        const [rows] = await pool.query(`SELECT * FROM ${this.tableName}`);
        return rows;
    }
    async findById(id) {
        const [rows] = await pool.query(`SELECT * FROM ${this.tableName} WHERE num_conta = ?`, [id]);
        return rows[0] || null;
    }
    async create(data) {
        const [result] = await pool.query(`INSERT INTO ${this.tableName} SET ?`, [data]);
        return result.insertId;
    }
    async update(id, data) {
        const [result] = await pool.query(`UPDATE ${this.tableName} SET ? WHERE num_conta = ?`, [data, id]);
        return result.affectedRows > 0;
    }
    async delete(id) {
        const [result] = await pool.query(`DELETE FROM ${this.tableName} WHERE num_conta = ?`, [id]);
        return result.affectedRows > 0;
    }
    async findByAgencia(num_ag) {
        const [rows] = await pool.query(`SELECT * FROM ${this.tableName} WHERE num_ag = ?`, [num_ag]);
        return rows;
    }
}
