import { Router } from 'express';
import { userRoutes } from '../modules/user/routes/userRoutes';
import { appointmentRoutes } from '../modules/appointment/routes/appointmentRoutes';
import { authRoutes } from '../modules/auth/routes/authRoutes';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { roomRoutes } from '../modules/room/routes/roomRoutes';

export const routes = Router();

routes.use('/auth', authRoutes)
routes.use('/users', userRoutes);
routes.use(AuthMiddleware.handler)
routes.use('/appointments', appointmentRoutes);
routes.use('/rooms', roomRoutes)
