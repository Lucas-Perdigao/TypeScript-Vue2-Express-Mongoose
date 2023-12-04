import { Router } from 'express'
import { userModule } from '../factories/UserFactory'
import { AuthMiddleware } from '../../../middlewares/AuthMiddleware'

export const userRoutes = Router()

userRoutes.get('/', AuthMiddleware.handler, userModule.getAll.bind(userModule))
userRoutes.get('/find', AuthMiddleware.handler, userModule.getByEmail.bind(userModule))
userRoutes.get('/:id', AuthMiddleware.handler, userModule.getById.bind(userModule))
userRoutes.post('/', userModule.create.bind(userModule))
userRoutes.put('/:id', AuthMiddleware.handler, userModule.update.bind(userModule))
userRoutes.delete('/:id', AuthMiddleware.handler, userModule.softDelete.bind(userModule))