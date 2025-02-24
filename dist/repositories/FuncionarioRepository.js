import pool from '../config/db';
export default class FuncionarioRepository {
    constructor() {
        this.tableName = 'funcionario';
    }
    async findAll() {
        const [rows] = await pool.query(`SELECT * FROM ${this.tableName}`);
        return rows;
    }
    async findById(id) {
        const [rows] = await pool.query(`SELECT * FROM ${this.tableName} WHERE matricula = ?`, [id]);
        return rows[0] || null;
    }
    async create(data) {
        const [result] = await pool.query(`INSERT INTO ${this.tableName} SET ?`, [data]);
        return result.insertId;
    }
    async update(id, data) {
        const [result] = await pool.query(`UPDATE ${this.tableName} SET ? WHERE matricula = ?`, [data, id]);
        return result.affectedRows > 0;
    }
    async delete(id) {
        const [result] = await pool.query(`DELETE FROM ${this.tableName} WHERE matricula = ?`, [id]);
        return result.affectedRows > 0;
    }
    async findByCargo(cargo) {
        const [rows] = await pool.query(`SELECT * FROM ${this.tableName} WHERE cargo = ?`, [cargo]);
        return rows;
    }
}
