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
 *     Voter:
 *       type: object
 *       required:
 *         - name
 *         - email
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
 * 
 * /voters:
 *   get:
 *     summary: Obtener lista de votantes
 *     tags: [Voters]
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
 *         description: Cantidad de elementos por página
 *     responses:
 *       200:
 *         description: Lista de votantes
 *   post:
 *     summary: Crear un nuevo votante
 *     tags: [Voters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Voter'
 *     responses:
 *       201:
 *         description: Votante creado exitosamente
 * 
 * /voters/{id}:
 *   get:
 *     summary: Obtener un votante por ID
 *     tags: [Voters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles del votante
 *   delete:
 *     summary: Eliminar un votante
 *     tags: [Voters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Votante eliminado exitosamente
 */