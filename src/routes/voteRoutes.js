const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
const { voteValidationRules, handleValidationErrors } = require('../middleware/validation');

router.post('/', voteValidationRules, handleValidationErrors, voteController.create);
router.get('/', voteController.getAll);
router.get('/statistics', voteController.getStatistics);

module.exports = router;

/**
 * @swagger
 * /votes:
 *   post:
 *     summary: Emitir un voto
 *     tags: [Votes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vote'
 *     responses:
 *       201:
 *         description: Voto registrado exitosamente
 *       400:
 *         description: Error en la votación
 *   get:
 *     summary: Obtener todos los votos
 *     tags: [Votes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de votos
 * 
 * /votes/statistics:
 *   get:
 *     summary: Obtener estadísticas de votación
 *     tags: [Votes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas de votación
 */