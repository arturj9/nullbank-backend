import { Router } from 'express';
import authRoutes from './authRoutes';
import agenciaRoutes from './agenciaRoutes';
import clienteRoutes from './clienteRoutes';
import { authMiddleware } from '../middlewares/authMiddleware';


const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/agencias', authMiddleware, agenciaRoutes);
routes.use('/clientes', authMiddleware, clienteRoutes)

export { routes };