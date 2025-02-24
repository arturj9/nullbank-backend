import pool from '../config/db';
export default class TransacaoRepository {
    constructor() {
        this.tableName = 'transacao';
    }
    async findAll() {
        const [rows] = await pool.query(`SELECT * FROM ${this.tableName}`);
        return rows;
    }
    async findById(id) {
        const [rows] = await pool.query(`SELECT * FROM ${this.tableName} WHERE num_transacao = ?`, [id]);
        return rows[0] || null;
    }
    async create(data) {
        const [result] = await pool.query(`INSERT INTO ${this.tableName} SET ?`, [data]);
        return result.insertId;
    }
    async update(id, data) {
        const [result] = await pool.query(`UPDATE ${this.tableName} SET ? WHERE num_transacao = ?`, [data, id]);
        return result.affectedRows > 0;
    }
    async delete(id) {
        const [result] = await pool.query(`DELETE FROM ${this.tableName} WHERE num_transacao = ?`, [id]);
        return result.affectedRows > 0;
    }
    async findByConta(num_conta) {
        const [rows] = await pool.query(`SELECT * FROM ${this.tableName} WHERE num_conta = ?`, [num_conta]);
        return rows;
    }
}
