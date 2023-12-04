import { Router } from 'express'
import { appointmentModule } from '../factories/AppointmentFactory'
import { AuthMiddleware } from '../../../middlewares/AuthMiddleware'

export const appointmentRoutes = Router()

appointmentRoutes.get('/', AuthMiddleware.handler, appointmentModule.getAll.bind(appointmentModule))
appointmentRoutes.get('/user/:id', AuthMiddleware.handler, appointmentModule.getByUserId.bind(appointmentModule))
appointmentRoutes.get('/:id', AuthMiddleware.handler, appointmentModule.getById.bind(appointmentModule))
appointmentRoutes.post('/byDate', AuthMiddleware.handler, appointmentModule.getByDates.bind(appointmentModule))
appointmentRoutes.post('/', AuthMiddleware.handler, appointmentModule.create.bind(appointmentModule))
appointmentRoutes.put('/:id', AuthMiddleware.handler, appointmentModule.update.bind(appointmentModule))
appointmentRoutes.delete('/:id', AuthMiddleware.handler, appointmentModule.softDelete.bind(appointmentModule))