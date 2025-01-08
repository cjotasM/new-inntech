const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const { candidateValidationRules, handleValidationErrors } = require('../middleware/validation');

router.post('/', candidateValidationRules, handleValidationErrors, candidateController.create);
router.get('/', candidateController.getAll);
router.get('/:id', candidateController.getById);
router.delete('/:id', candidateController.delete);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     CandidateInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - party
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del candidato
 *         email:
 *           type: string
 *           format: email
 *           description: Email único del candidato
 *         party:
 *           type: string
 *           description: Partido político del candidato
 *     
 *     CandidateResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del candidato
 *         name:
 *           type: string
 *           description: Nombre del candidato
 *         email:
 *           type: string
 *           format: email
 *           description: Email único del candidato
 *         party:
 *           type: string
 *           description: Partido político del candidato
 *         votes:
 *           type: integer
 *           description: Número de votos recibidos
 *           default: 0
 * 
 * /candidates:
 *   post:
 *     summary: Crear un nuevo candidato
 *     tags: [Candidates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CandidateInput'
 *     responses:
 *       201:
 *         description: Candidato creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CandidateResponse'
 *       400:
 *         description: Error de validación o el email ya está registrado
 *   get:
 *     summary: Obtener lista de candidatos
 *     tags: [Candidates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Elementos por página
 *     responses:
 *       200:
 *         description: Lista de candidatos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 candidates:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CandidateResponse'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 * 
 * /candidates/{id}:
 *   get:
 *     summary: Obtener un candidato por ID
 *     tags: [Candidates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del candidato a consultar
 *     responses:
 *       200:
 *         description: Detalles del candidato
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CandidateResponse'
 *       404:
 *         description: Candidato no encontrado
 *       500:
 *         description: Error del servidor
 *   delete:
 *     summary: Eliminar un candidato
 *     tags: [Candidates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del candidato a eliminar
 *     responses:
 *       200:
 *         description: Candidato eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Candidato eliminado exitosamente
 *       404:
 *         description: Candidato no encontrado
 *       500:
 *         description: Error del servidor
 */