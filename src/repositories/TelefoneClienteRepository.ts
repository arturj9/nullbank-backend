import pool from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { TelefoneCliente } from '../@types/entities/TelefoneCliente';

export default class TelefoneClienteRepository {
    private tableName = 'telefone_cliente';

    async create(telefoneCliente: TelefoneCliente): Promise<TelefoneCliente> {
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO ${this.tableName} (telefone, cpf_cliente, tipo) VALUES (?, ?, ?)`,
            [telefoneCliente.telefone, telefoneCliente.cpf_cliente, telefoneCliente.tipo]
        );
        return { ...telefoneCliente };
    }

    async findByCpfCliente(cpfCliente: string): Promise<TelefoneCliente[]> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM ${this.tableName} WHERE cpf_cliente = ?`,
            [cpfCliente]
        );
        return rows as TelefoneCliente[];
    }

    async update(telefone: string, cpfCliente: string, telefoneCliente: Partial<TelefoneCliente>): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `UPDATE ${this.tableName} SET ? WHERE telefone = ? AND cpf_cliente = ?`,
            [telefoneCliente, telefone, cpfCliente]
        );
        return result.affectedRows > 0;
    }

    async delete(telefone: string, cpfCliente: string): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `DELETE FROM ${this.tableName} WHERE telefone = ? AND cpf_cliente = ?`,
            [telefone, cpfCliente]
        );
        return result.affectedRows > 0;
    }
}