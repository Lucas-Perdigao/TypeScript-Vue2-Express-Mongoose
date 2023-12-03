import { Router } from 'express'
import { appointmentModule } from '../factories/AppointmentFactory'

export const appointmentRoutes = Router()

appointmentRoutes.get('/', appointmentModule.getAll.bind(appointmentModule))
appointmentRoutes.post('/byDate', appointmentModule.getByDates.bind(appointmentModule))
appointmentRoutes.get('/:id', appointmentModule.getById.bind(appointmentModule))
appointmentRoutes.get('/user/:id', appointmentModule.getByUserId.bind(appointmentModule))
appointmentRoutes.post('/', appointmentModule.create.bind(appointmentModule))
appointmentRoutes.put('/', appointmentModule.update.bind(appointmentModule))
appointmentRoutes.delete('/', appointmentModule.softDelete.bind(appointmentModule))