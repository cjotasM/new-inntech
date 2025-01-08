const db = require('../config/database');

class CandidateController {
    async create(req, res) {
        try {
            const { name, party, email } = req.body;

            if (!email) {
                return res.status(400).json({
                    error: 'El email es requerido'
                });
            }

            // Verificar si existe como votante
            const voterExists = await db.query(
                'SELECT id FROM voters WHERE email = $1',
                [email]
            );

            if (voterExists.rows.length > 0) {
                return res.status(400).json({
                    error: 'Un votante no puede ser registrado como candidato'
                });
            }

            // Verificar si ya existe como candidato
            const candidateExists = await db.query(
                'SELECT id FROM candidates WHERE email = $1',
                [email]
            );

            if (candidateExists.rows.length > 0) {
                return res.status(400).json({
                    error: 'Este email ya está registrado como candidato'
                });
            }

            const result = await db.query(
                'INSERT INTO candidates (name, party, email) VALUES ($1, $2, $3) RETURNING *',
                [name, party, email]
            );

            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Error al crear candidato:', error);
            res.status(500).json({ error: 'Error al crear candidato' });
        }
    }

    async getAll(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;

            const countResult = await db.query('SELECT COUNT(*) FROM candidates');
            const result = await db.query(
                'SELECT * FROM candidates ORDER BY id LIMIT $1 OFFSET $2',
                [limit, offset]
            );

            res.json({
                candidates: result.rows,
                total: parseInt(countResult.rows[0].count),
                page,
                totalPages: Math.ceil(countResult.rows[0].count / limit)
            });
        } catch (error) {
            console.error('Error al obtener candidatos:', error);
            res.status(500).json({ error: 'Error al obtener candidatos' });
        }
    }

    async getById(req, res) {
        try {
            const result = await db.query(
                'SELECT * FROM candidates WHERE id = $1',
                [req.params.id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Candidato no encontrado' });
            }

            res.json(result.rows[0]);
        } catch (error) {
            console.error('Error al obtener candidato:', error);
            res.status(500).json({ error: 'Error al obtener candidato' });
        }
    }

    async delete(req, res) {
        try {
            const result = await db.query(
                'DELETE FROM candidates WHERE id = $1 RETURNING *',
                [req.params.id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Candidato no encontrado' });
            }

            res.json({ message: 'Candidato eliminado exitosamente' });
        } catch (error) {
            console.error('Error al eliminar candidato:', error);
            res.status(500).json({ error: 'Error al eliminar candidato' });
        }
    }
}

module.exports = new CandidateController();