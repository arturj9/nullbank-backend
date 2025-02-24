import pool from '../config/db';
import { RowDataPacket } from 'mysql2/promise';
import { compareSync } from 'bcrypt';
import jwt from "jsonwebtoken";
import jwt_key from '../config/jwt';

export default class AuthService {
    // Verifica se é um Admin
    async isAdmin(username: string, password: string): Promise<boolean> {
        return username === 'Admin' && password === 'Root';
    }

    // Busca um cliente pelo CPF
    async findClienteByCpf(cpf: string, password: string): Promise<{ tipo: string; id: string } | null> {
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT cpf, senha FROM cliente WHERE cpf = ?',
            [cpf]
        );
        if (rows.length === 0) return null;

        const cliente = rows[0];
        const senhaValida = compareSync(password, cliente.senha);
        if (!senhaValida) return null;

        return { tipo: 'cliente', id: cliente.cpf };
    }

    // Busca um funcionário pela matrícula
    async findFuncionarioByMatricula(matricula: string, password: string): Promise<{ tipo: string; id: string } | null> {
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT matricula, senha, cargo FROM funcionario WHERE matricula = ?',
            [matricula]
        );
        if (rows.length === 0) return null;

        const funcionario = rows[0];
        const senhaValida = compareSync(password, funcionario.senha);
        if (!senhaValida) return null;

        // Define o tipo de funcionário
        const tipo = funcionario.cargo; // 'gerente', 'atendente', 'caixa'
        return { tipo, id: funcionario.matricula };
    }

    // Gera o JWT
    generateToken(user: { tipo: string; id: string }): string {
        return jwt.sign({ tipo: user.tipo, id: user.id }, jwt_key, { expiresIn: '1h' });
    }
}