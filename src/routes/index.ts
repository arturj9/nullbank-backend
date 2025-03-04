import { Router } from 'express';
import authRoutes from './authRoutes';
import agenciaRoutes from './agenciaRoutes';
import clienteRoutes from './clienteRoutes';
import funcionarioRoutes from './funcionarioRoutes';
import dependenteRoutes from './dependenteRoutes';
import emailClienteRoutes from './emailClienteRoutes';
import telefoneClienteRoutes from './telefoneClienteRoutes';
import contaRoutes from './contaRoutes';
import { authMiddleware } from '../middlewares/authMiddleware';


const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/agencias', authMiddleware, agenciaRoutes);
routes.use('/clientes', authMiddleware, clienteRoutes);
routes.use('/funcionarios', funcionarioRoutes);
routes.use('/dependentes', dependenteRoutes);
routes.use('/email-cliente', emailClienteRoutes);
routes.use('/telefone-cliente', telefoneClienteRoutes);
routes.use('/contas', contaRoutes);

export { routes };