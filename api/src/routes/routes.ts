import { Router } from 'express';
import { userRoutes } from '../modules/user/routes/userRoutes';
import { appointmentRoutes } from '../modules/appointment/routes/appointmentRoutes';

export const routes = Router();

routes.use('/users', userRoutes);
routes.use('/appointments', appointmentRoutes);
