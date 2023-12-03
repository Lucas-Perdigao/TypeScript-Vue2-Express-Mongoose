import { Router } from 'express'
import { userModule } from '../factories/UserFactory'

export const userRoutes = Router()

userRoutes.get('/', userModule.getAll.bind(userModule))
userRoutes.get('/find', userModule.getByEmail.bind(userModule))
userRoutes.get('/:id', userModule.getById.bind(userModule))
userRoutes.post('/', userModule.create.bind(userModule))
userRoutes.put('/:id', userModule.update.bind(userModule))
userRoutes.delete('/:id', userModule.softDelete.bind(userModule))