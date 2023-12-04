import { Router } from 'express'
import { appointmentModule } from '../factories/AppointmentFactory'

export const appointmentRoutes = Router()

appointmentRoutes.get('/', appointmentModule.getAll.bind(appointmentModule))
appointmentRoutes.get('/user/:id', appointmentModule.getByUserId.bind(appointmentModule))
appointmentRoutes.get('/:id', appointmentModule.getById.bind(appointmentModule))
appointmentRoutes.post('/byDate', appointmentModule.getByDates.bind(appointmentModule))
appointmentRoutes.post('/', appointmentModule.create.bind(appointmentModule))
appointmentRoutes.put('/:id', appointmentModule.update.bind(appointmentModule))
appointmentRoutes.delete('/:id', appointmentModule.softDelete.bind(appointmentModule))