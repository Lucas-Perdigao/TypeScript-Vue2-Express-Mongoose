import { Router } from 'express'
import { roomModule } from '../factories/RoomFactory'

export const roomRoutes = Router()

roomRoutes.post('/', roomModule.create.bind(roomModule))
roomRoutes.get('/', roomModule.getAll.bind(roomModule))
roomRoutes.get('/:id', roomModule.getById.bind(roomModule))
roomRoutes.put('/:id', roomModule.update.bind(roomModule))
roomRoutes.delete('/:id', roomModule.softDelete.bind(roomModule))
