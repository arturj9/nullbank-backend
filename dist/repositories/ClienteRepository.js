import pool from '../config/db.js';
export default class ClienteRepository {
    constructor() {
        this.tableName = 'cliente';
    }
    // Busca todos os clientes
    async findAll() {
        const [rows] = await pool.query(`SELECT * FROM ${this.tableName}`);
        return rows;
    }
    // Busca um cliente pelo CPF
    async findByCpf(cpf) {
        const [rows] = await pool.query(`SELECT * FROM ${this.tableName} WHERE cpf = ?`, [cpf]);
        return rows[0] || null;
    }
    // Cria um novo cliente
    async create(data) {
        const [result] = await pool.query(`INSERT INTO ${this.tableName} SET ?`, [data]);
        return result.insertId.toString();
    }
    // Atualiza um cliente existente
    async update(cpf, data) {
        const [result] = await pool.query(`UPDATE ${this.tableName} SET ? WHERE cpf = ?`, [data, cpf]);
        return result.affectedRows > 0;
    }
    // Deleta um cliente pelo CPF
    async delete(cpf) {
        const [result] = await pool.query(`DELETE FROM ${this.tableName} WHERE cpf = ?`, [cpf]);
        return result.affectedRows > 0;
    }
    // Busca clientes pelo nome
    async findByNome(nome) {
        const [rows] = await pool.query(`SELECT * FROM ${this.tableName} WHERE nome_completo LIKE ?`, [`%${nome}%`]);
        return rows;
    }
}
