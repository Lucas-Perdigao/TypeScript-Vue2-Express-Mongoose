import { Router } from 'express'
import { roomModule } from '../factories/RoomFactory'

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: API para gerenciar salas
 */
export const roomRoutes = Router()

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Cria uma nova sala
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Sala 1
 *     responses:
 *       201:
 *         description: Sala criada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               name: Sala 1
 *               createdAt: 2023-12-08T23:08:27.636Z
 *               updatedAt: 2023-12-08T23:08:27.636Z
 *               deletedAt: null
 *       400:
 *         description: Erro de validação nos dados da sala
 *       500:
 *         description: Erro interno do servidor
 */
roomRoutes.post('/', roomModule.create.bind(roomModule))

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Obtém todas as salas
 *     tags: [Rooms]
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
 *         description: Filtrar salas pelo nome
 *     responses:
 *       200:
 *         description: Lista de salas
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 name: Sala 1
 *                 createdAt: 2023-12-08T23:08:27.636Z
 *                 updatedAt: 2023-12-08T23:08:27.636Z
 *                 deletedAt: null
 *       500:
 *         description: Erro interno do servidor
 */
roomRoutes.get('/', roomModule.getAll.bind(roomModule))

/**
 * @swagger
 * /rooms/{id}:
 *   get:
 *     summary: Obtém uma sala pelo ID
 *     tags: [Rooms]
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
 *         description: Dados da sala encontrada
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               name: Sala 1
 *               createdAt: 2023-12-08T23:08:27.636Z
 *               updatedAt: 2023-12-08T23:08:27.636Z
 *               deletedAt: null
 *       500:
 *         description: Erro interno do servidor
 */
roomRoutes.get('/:id', roomModule.getById.bind(roomModule))

/**
 * @swagger
 * /rooms/{id}:
 *   put:
 *     summary: Atualiza uma sala pelo ID
 *     tags: [Rooms]
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
 *             name: Sala Atualizada
 *     responses:
 *       200:
 *         description: Sala atualizada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               name: Sala Atualizada
 *               createdAt: 2023-12-08T23:08:27.636Z
 *               updatedAt: [nova data de atualização]
 *               deletedAt: null
 *       400:
 *         description: Erro de validação nos dados da sala
 *       404:
 *         description: Sala não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
roomRoutes.put('/:id', roomModule.update.bind(roomModule))

/**
 * @swagger
 * /rooms/{id}:
 *   delete:
 *     summary: Remove uma sala pelo ID
 *     tags: [Rooms]
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
 *         description: Sala removida com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               name: Sala 1
 *               createdAt: 2023-12-08T23:08:27.636Z
 *               updatedAt: 2023-12-08T23:08:27.636Z
 *               deletedAt: [nova data de remoção]
 *       404:
 *         description: Sala não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
roomRoutes.delete('/:id', roomModule.softDelete.bind(roomModule))
