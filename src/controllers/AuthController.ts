import { Request } from 'express';
import AuthService from '../services/AuthService';

export default class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async login(request: Request): Promise<{ status: number; body: { token: string, user: {} } | { message: string } }> {
        const { user, password } = request.body;

        // Verifica se é Admin
        if (await this.authService.isAdmin(user, password)) {
            const token = this.authService.generateToken({ tipo: 'admin', id: '0' });
            const user = {
                id:0,
                nome: "Admin",
                tipo: "admin",
                cargo: ""
            }
            return { status: 200, body: { token, user } };
        }

        // Verifica se é Funcionário
        const funcionario = await this.authService.findFuncionarioByMatricula(user, password);
        if (funcionario) {
            const user = {
                id:funcionario.id,
                nome: funcionario.nome_completo,
                tipo: "funcionario",
                cargo: funcionario.tipo
            }
            const token = this.authService.generateToken(funcionario);
            return { status: 200, body: { token, user } };
        }

        // Verifica se é Cliente
        // const cliente = await this.authService.findClienteByCpf(user, password);
        // if (cliente) {
        //     const token = this.authService.generateToken(cliente);
        //     return { status: 200, body: { token } };
        // }

        // Se não encontrou nenhum usuário válido
        return { status: 401, body: { message: 'Credenciais inválidas' } };
    }
}