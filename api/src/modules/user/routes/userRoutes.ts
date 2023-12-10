import { Router } from 'express';
import { userModule } from '../factories/UserFactory';
import { AuthMiddleware } from '../../../middlewares/AuthMiddleware';

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: API para gerenciar usuários
 */
export const userRoutes = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtém todos os usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página para paginar os resultados
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número de resultados por página
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtrar usuários pelo nome
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filtrar usuários pelo email
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         enum: [client, broker]
 *         description: Filtrar usuários pelo papel (client ou broker)
 *       - in: query
 *         name: dailyAppointments
 *         schema:
 *           type: integer
 *         description: Filtrar usuários pelo número diário de compromissos
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 name: John Doe
 *                 email: john@example.com
 *                 role: broker
 *                 dailyAppointments: 0
 *                 createdAt: 2023-12-08T23:08:27.636Z,
 *                 updatedAt: 2023-12-08T23:08:27.636Z,
 *                 deletedAt: null
 *       500:
 *          description: Nenhum usuário encontrado
 */
userRoutes.get('/', AuthMiddleware.handler, userModule.getAll.bind(userModule));

/**
 * @swagger
 * /users/find:
 *   get:
 *     summary: Encontra um usuário pelo email
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do usuário encontrado
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               name: John Doe
 *               email: john@example.com
 *               role: broker
 *               dailyAppointments: 0
 *               createdAt: 2023-12-08T23:08:27.636Z,
 *               updatedAt: 2023-12-08T23:08:27.636Z,
 *               deletedAt: null
 */
userRoutes.get('/find', AuthMiddleware.handler, userModule.getByEmail.bind(userModule));

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtém um usuário pelo ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do usuário encontrado
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               name: John Doe
 *               email: john@example.com
 *               role: broker
 *               dailyAppointments: 0
 *               createdAt: 2023-12-08T23:08:27.636Z,
 *               updatedAt: 2023-12-08T23:08:27.636Z,
 *               deletedAt: null
 */
userRoutes.get('/:id', AuthMiddleware.handler, userModule.getById.bind(userModule))

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: John Doe
 *             email: john@example.com
 *             password: yourpassword
 *             role: broker
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               name: John Doe
 *               email: john@example.com
 *               role: broker
 *               dailyAppointments: 0
 *               createdAt: 2023-12-08T23:08:27.636Z,
 *               updatedAt: 2023-12-08T23:08:27.636Z,
 *               deletedAt: null
 *       400:
 *         description: Erro de validação nos dados do usuário
 */
userRoutes.post('/', userModule.create.bind(userModule))

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Updated Name
 *             email: updated@example.com
 *             role: client
 *             dailyAppointments: 3
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               name: Updated Name
 *               email: updated@example.com
 *               role: client
 *               dailyAppointments: 3
 *               createdAt: 2023-12-08T23:08:27.636Z,
 *               updatedAt: [nova data de atualização]
 *               deletedAt: null
 *       400:
 *         description: Erro de validação nos dados do usuário
 *       404:
 *         description: Usuário não encontrado
 */
userRoutes.put('/:id', AuthMiddleware.handler, userModule.update.bind(userModule))


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário pelo ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               name: John Doe
 *               email: john@example.com
 *               role: broker
 *               dailyAppointments: 0
 *               createdAt: 2023-12-08T23:08:27.636Z,
 *               updatedAt: 2023-12-08T23:08:27.636Z,
 *               deletedAt: [nova data de remoção]
 *       404:
 *         description: Usuário não encontrado
 */
userRoutes.delete('/:id', AuthMiddleware.handler, userModule.softDelete.bind(userModule))