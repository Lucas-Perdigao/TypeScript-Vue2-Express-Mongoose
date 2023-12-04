import { Router } from 'express'
import { authModule } from '../factories/AuthFactory'

export const authRoutes = Router()

authRoutes.post('/login', authModule.login.bind(authModule))