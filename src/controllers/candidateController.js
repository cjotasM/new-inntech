const Candidate = require('../models/Candidate');

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
            const isVoter = await Candidate.checkVoterExists(email);
            if (isVoter) {
                return res.status(400).json({
                    error: 'Un votante no puede ser registrado como candidato'
                });
            }

            // Verificar si ya existe como candidato
            const existingCandidate = await Candidate.findByEmail(email);
            if (existingCandidate) {
                return res.status(400).json({
                    error: 'Este email ya está registrado como candidato'
                });
            }

            const candidate = await Candidate.create({ name, party, email });
            res.status(201).json(candidate);
        } catch (error) {
            console.error('Error al crear candidato:', error);
            res.status(500).json({ error: 'Error al crear candidato' });
        }
    }

    async getAll(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const result = await Candidate.findAll(page, limit);
            res.json(result);
        } catch (error) {
            console.error('Error al obtener candidatos:', error);
            res.status(500).json({ error: 'Error al obtener candidatos' });
        }
    }

    async getById(req, res) {
        try {
            const candidate = await Candidate.findById(req.params.id);
            if (!candidate) {
                return res.status(404).json({ error: 'Candidato no encontrado' });
            }
            res.json(candidate);
        } catch (error) {
            console.error('Error al obtener candidato:', error);
            res.status(500).json({ error: 'Error al obtener candidato' });
        }
    }

    async delete(req, res) {
        try {
            const candidate = await Candidate.delete(req.params.id);
            if (!candidate) {
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