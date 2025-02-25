import pool from '../config/db';
import { RowDataPacket } from 'mysql2/promise';
import { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import jwt_key from '../config/jwt';

export default class AuthService {
    // Verifica se é um Admin
    async isAdmin(username: string, password: string): Promise<boolean> {
        return username === 'Admin' && password === 'Root';
    }

    // Busca um cliente pelo CPF
    async findClienteByCpf(cpf: string, password: string): Promise<{ tipo: string; id: string, nome_completo:string } | null> {
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT cpf, nome_completo, senha FROM cliente WHERE cpf = ?',
            [cpf]
        );
        if (rows.length === 0) return null;

        const cliente = rows[0];
        const senhaValida = compareSync(password, cliente.senha); // Compara a senha fornecida com o hash armazenado
        if (!senhaValida) return null;

        return { tipo: 'cliente', id: cliente.cpf, nome_completo: cliente.nome_completo  };
    }

    // Busca um funcionário pela matrícula
    async findFuncionarioByMatricula(matricula: string, password: string): Promise<{ tipo: string; id: string, nome_completo:string } | null> {
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT nome_completo, matricula, senha, cargo FROM funcionario WHERE matricula = ?',
            [matricula]
        );
        if (rows.length === 0) return null;

        const funcionario = rows[0];
        const senhaValida = compareSync(password, funcionario.senha); // Compara a senha fornecida com o hash armazenado
        if (!senhaValida) return null;

        // Define o tipo de funcionário
        const tipo = funcionario.cargo; // 'gerente', 'atendente', 'caixa'
        return { tipo, id: funcionario.matricula, nome_completo:funcionario.nome_completo };
    }

    // Gera o JWT
    generateToken(user: { tipo: string; id: string }): string {
        return jwt.sign({ userType: user.tipo, id: user.id }, jwt_key, { expiresIn: '1h' });
    }
}