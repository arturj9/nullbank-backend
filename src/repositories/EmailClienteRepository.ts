import pool from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { EmailCliente } from '../@types/entities/EmailCliente';

export default class EmailClienteRepository {
    private tableName = 'email_cliente';

    async create(emailCliente: EmailCliente): Promise<EmailCliente> {
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO ${this.tableName} (email, cpf_cliente, tipo) VALUES (?, ?, ?)`,
            [emailCliente.email, emailCliente.cpf_cliente, emailCliente.tipo]
        );
        return { ...emailCliente };
    }

    async findByCpfCliente(cpfCliente: string): Promise<EmailCliente[]> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM ${this.tableName} WHERE cpf_cliente = ?`,
            [cpfCliente]
        );
        return rows as EmailCliente[];
    }

    async update(email: string, cpfCliente: string, emailCliente: Partial<EmailCliente>): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `UPDATE ${this.tableName} SET ? WHERE email = ? AND cpf_cliente = ?`,
            [emailCliente, email, cpfCliente]
        );
        return result.affectedRows > 0;
    }

    async delete(email: string, cpfCliente: string): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `DELETE FROM ${this.tableName} WHERE email = ? AND cpf_cliente = ?`,
            [email, cpfCliente]
        );
        return result.affectedRows > 0;
    }
}