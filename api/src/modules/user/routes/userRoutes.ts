import { Router } from 'express'
import { userModule } from '../factories/UserFactory'

export const userRoutes = Router()

userRoutes.get('/users', userModule.getAll.bind(userModule))
userRoutes.get('/users/find', userModule.getByEmail.bind(userModule))
userRoutes.get('/users/:id', userModule.getById.bind(userModule))
userRoutes.post('/users', userModule.create.bind(userModule))
userRoutes.put('/users/:id', userModule.update.bind(userModule))
userRoutes.delete('/users/:id', userModule.softDelete.bind(userModule))