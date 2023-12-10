import { Router } from 'express'
import { appointmentModule } from '../factories/AppointmentFactory'

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: API para gerenciar agendamentos
 */
export const appointmentRoutes = Router()

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Obtém todos os agendamentos
 *     tags: [Appointments]
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
 *         name: appointmentStart
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Data de início do agendamento (formato ISO 8601)
 *       - in: query
 *         name: appointmentEnd
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Data de término do agendamento (formato ISO 8601)
 *       - in: query
 *         name: client
 *         schema:
 *           type: string
 *         description: ID do cliente associado ao agendamento
 *       - in: query
 *         name: broker
 *         schema:
 *           type: string
 *         description: ID do corretor associado ao agendamento
 *       - in: query
 *         name: room
 *         schema:
 *           type: string
 *         description: ID da sala associada ao agendamento
 *     responses:
 *       200:
 *         description: Lista de agendamentos
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 title: "Meeting"
 *                 description: "Discuss project details"
 *                 appointmentStart: "2023-12-08T10:00:00.000Z"
 *                 appointmentEnd: "2023-12-08T11:00:00.000Z"
 *                 client: "2"
 *                 broker: "3"
 *                 room: "4"
 *                 createdAt: "2023-12-08T23:08:27.636Z"
 *                 updatedAt: "2023-12-08T23:08:27.636Z"
 *                 deletedAt: null
 *       400:
 *         description: Erro de validação nos parâmetros da consulta
 *       500:
 *         description: Erro interno do servidor
 */
appointmentRoutes.get('/', appointmentModule.getAll.bind(appointmentModule))

/**
 * @swagger
 * /appointments/user/{id}:
 *   get:
 *     summary: Obtém todos os agendamentos pelo ID do usuário
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário para obter seus agendamentos
 *     responses:
 *       200:
 *         description: Lista de agendamentos do usuário
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 title: "Meeting"
 *                 description: "Discuss project details"
 *                 appointmentStart: "2023-12-08T10:00:00.000Z"
 *                 appointmentEnd: "2023-12-08T11:00:00.000Z"
 *                 client: "2"
 *                 broker: "3"
 *                 room: "4"
 *                 createdAt: "2023-12-08T23:08:27.636Z"
 *                 updatedAt: "2023-12-08T23:08:27.636Z"
 *                 deletedAt: null
 *       500:
 *         description: Erro interno do servidor
 */
appointmentRoutes.get('/user/:id', appointmentModule.getByUserId.bind(appointmentModule))

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Obtém um agendamento por ID
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do agendamento a ser obtido
 *     responses:
 *       200:
 *         description: Agendamento encontrado
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               title: "Meeting"
 *               description: "Discuss project details"
 *               appointmentStart: "2023-12-08T10:00:00.000Z"
 *               appointmentEnd: "2023-12-08T11:00:00.000Z"
 *               client: "2"
 *               broker: "3"
 *               room: "4"
 *               createdAt: "2023-12-08T23:08:27.636Z"
 *               updatedAt: "2023-12-08T23:08:27.636Z"
 *               deletedAt: null
 *       500:
 *         description: Erro interno do servidor
 */
appointmentRoutes.get('/:id', appointmentModule.getById.bind(appointmentModule))

/**
 * @swagger
 * /appointments/byDate:
 *   post:
 *     summary: Obtém agendamentos por intervalo de datas
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             appointmentStart: "2023-12-08T10:00:00.000Z"
 *             appointmentEnd: "2023-12-08T12:00:00.000Z"
 *     responses:
 *       200:
 *         description: Lista de agendamentos no intervalo de datas
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 title: "Meeting"
 *                 description: "Discuss project details"
 *                 appointmentStart: "2023-12-08T10:00:00.000Z"
 *                 appointmentEnd: "2023-12-08T11:00:00.000Z"
 *                 client: "2"
 *                 broker: "3"
 *                 room: "4"
 *                 createdAt: "2023-12-08T23:08:27.636Z"
 *                 updatedAt: "2023-12-08T23:08:27.636Z"
 *                 deletedAt: null
 *       400:
 *         description: Erro de validação nos dados de intervalo de datas
 *       500:
 *         description: Erro interno do servidor
 */

appointmentRoutes.post('/byDate', appointmentModule.getByDates.bind(appointmentModule))

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Cria um novo agendamento
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "Meeting"
 *             description: "Discuss project details"
 *             appointmentStart: "2023-12-08T10:00:00.000Z"
 *             appointmentEnd: "2023-12-08T11:00:00.000Z"
 *             client: "2"
 *             broker: "3"
 *             room: "4"
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               title: "Meeting"
 *               description: "Discuss project details"
 *               appointmentStart: "2023-12-08T10:00:00.000Z"
 *               appointmentEnd: "2023-12-08T11:00:00.000Z"
 *               client: "2"
 *               broker: "3"
 *               room: "4"
 *               createdAt: "2023-12-08T23:08:27.636Z"
 *               updatedAt: "2023-12-08T23:08:27.636Z"
 *               deletedAt: null
 *       400:
 *         description: Erro de validação nos dados do agendamento
 *       401:
 *         description: Usuário não autorizado (somente clientes podem agendar)
 *       500:
 *         description: Erro interno do servidor
 */
appointmentRoutes.post('/', appointmentModule.create.bind(appointmentModule))

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Atualiza um agendamento por ID
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do agendamento a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "Updated Meeting"
 *             description: "Discuss project details"
 *             appointmentStart: "2023-12-08T10:00:00.000Z"
 *             appointmentEnd: "2023-12-08T11:00:00.000Z"
 *             client: "2"
 *             broker: "3"
 *             room: "4"
 *     responses:
 *       200:
 *         description: Agendamento atualizado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               title: "Updated Meeting"
 *               description: "Discuss project details"
 *               appointmentStart: "2023-12-08T10:00:00.000Z"
 *               appointmentEnd: "2023-12-08T11:00:00.000Z"
 *               client: "2"
 *               broker: "3"
 *               room: "4"
 *               createdAt: "2023-12-08T23:08:27.636Z"
 *               updatedAt: "2023-12-08T23:08:27.636Z"
 *               deletedAt: null
 *       400:
 *         description: Erro de validação nos dados do agendamento
 *       500:
 *         description: Erro interno do servidor
 */
appointmentRoutes.put('/:id', appointmentModule.update.bind(appointmentModule))

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Exclui um agendamento por ID
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do agendamento a ser excluído
 *     responses:
 *       200:
 *         description: Agendamento excluído com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               title: "Meeting"
 *               description: "Discuss project details"
 *               appointmentStart: "2023-12-08T10:00:00.000Z"
 *               appointmentEnd: "2023-12-08T11:00:00.000Z"
 *               client: "2"
 *               broker: "3"
 *               room: "4"
 *               createdAt: "2023-12-08T23:08:27.636Z"
 *               updatedAt: "2023-12-08T23:08:27.636Z"
 *               deletedAt: "2023-12-09T00:00:00.000Z"
 *       500:
 *         description: Erro interno do servidor
 */
appointmentRoutes.delete('/:id', appointmentModule.softDelete.bind(appointmentModule))
