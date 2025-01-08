const express = require('express');
const router = express.Router();
const voterController = require('../controllers/voterController');
const { voterValidationRules, handleValidationErrors } = require('../middleware/validation');

router.post('/', voterValidationRules, handleValidationErrors, voterController.create);
router.get('/', voterController.getAll);
router.get('/:id', voterController.getById);
router.delete('/:id', voterController.delete);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     VoterInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del votante
 *         email:
 *           type: string
 *           format: email
 *           description: Email único del votante
 *         password:
 *           type: string
 *           format: password
 *           minLength: 6
 *           description: Contraseña del votante (mínimo 6 caracteres)
 *     
 *     VoterResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del votante
 *         name:
 *           type: string
 *           description: Nombre del votante
 *         email:
 *           type: string
 *           format: email
 *           description: Email único del votante
 *         has_voted:
 *           type: boolean
 *           description: Indica si el votante ya ha emitido su voto
 *           default: false
 * 
 * /voters:
 *   get:
 *     summary: Obtener lista de votantes
 *     tags: [Voters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Cantidad de elementos por página
 *     responses:
 *       200:
 *         description: Lista de votantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 voters:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/VoterResponse'
 *                 total:
 *                   type: integer
 *                   description: Total de votantes en la base de datos
 *                 page:
 *                   type: integer
 *                   description: Página actual
 *                 totalPages:
 *                   type: integer
 *                   description: Total de páginas disponibles
 *       500:
 *         description: Error del servidor
 *   
 *   post:
 *     summary: Crear un nuevo votante
 *     tags: [Voters]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VoterInput'
 *     responses:
 *       201:
 *         description: Votante creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VoterResponse'
 *       400:
 *         description: Error de validación o el email ya está registrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 * 
 * /voters/{id}:
 *   get:
 *     summary: Obtener un votante por ID
 *     tags: [Voters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del votante a consultar
 *     responses:
 *       200:
 *         description: Detalles del votante
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VoterResponse'
 *       404:
 *         description: Votante no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Voter not found
 *       500:
 *         description: Error del servidor
 *   
 *   delete:
 *     summary: Eliminar un votante
 *     tags: [Voters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del votante a eliminar
 *     responses:
 *       200:
 *         description: Votante eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Votante eliminado exitosamente
 *       404:
 *         description: Votante no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Voter not found
 *       500:
 *         description: Error del servidor
 */