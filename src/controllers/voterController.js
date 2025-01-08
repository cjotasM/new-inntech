const Voter = require('../models/Voter');

class VoterController {
    async create(req, res) {
        try {
            const voter = await Voter.create(req.body);
            res.status(201).json(voter);
        } catch (error) {
            res.status(500).json({ error: 'Error creating voter' });
        }
    }

    async getAll(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const voters = await Voter.findAll(page, limit);
            res.json(voters);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching voters' });
        }
    }

    async getById(req, res) {
        try {
            const voter = await Voter.findById(req.params.id);
            if (!voter) {
                return res.status(404).json({ error: 'Voter not found' });
            }
            res.json(voter);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching voter' });
        }
    }

    async delete(req, res) {
        try {
            const voter = await Voter.delete(req.params.id);
            if (!voter) {
                return res.status(404).json({ error: 'Voter not found' });
            }
            res.json({ message: 'Voter deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting voter' });
        }
    }
}

module.exports = new VoterController();