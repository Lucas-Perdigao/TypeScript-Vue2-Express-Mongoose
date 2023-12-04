import { Router } from 'express';
import { userRoutes } from '../modules/user/routes/userRoutes';
import { appointmentRoutes } from '../modules/appointment/routes/appointmentRoutes';
import { authRoutes } from '../modules/auth/routes/authRoutes';

export const routes = Router();

routes.use('/auth', authRoutes)
routes.use('/users', userRoutes);
routes.use('/appointments', appointmentRoutes);
