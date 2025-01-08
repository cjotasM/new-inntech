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
 * /candidates:
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
 *             $ref: '#/components/schemas/Candidate'
 *     responses:
 *       201:
 *         description: Candidato creado exitosamente
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
 *     responses:
 *       200:
 *         description: Detalles del candidato
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
 *     responses:
 *       200:
 *         description: Candidato eliminado exitosamente
 */