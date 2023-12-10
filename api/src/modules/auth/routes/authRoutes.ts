import { Router } from 'express'
import { authModule } from '../factories/AuthFactory'

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API para autenticação de usuários
 */
export const authRoutes = Router()

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: user@example.com
 *             password: userpassword123
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               token: "jwt_token"
 *               user: {
 *                 id: "1",
 *                 name: "John Doe",
 *                 email: "user@example.com",
 *                 role: "client",
 *                 dailyAppointments: 0,
 *                 createdAt: "2023-12-08T23:08:27.636Z",
 *                 updatedAt: "2023-12-08T23:08:27.636Z",
 *                 deletedAt: null
 *               }
 *       400:
 *         description: Erro de validação nos dados de autenticação
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */
authRoutes.post('/login', authModule.login.bind(authModule))