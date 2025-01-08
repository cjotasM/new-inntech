const Vote = require('../models/Vote');
const Voter = require('../models/Voter');

class VoteController {
    async create(req, res) {
        try {
            // Verificar si el votante ya votó
            const hasVoted = await Vote.hasVoted(req.body.voter_id);
            if (hasVoted) {
                return res.status(400).json({ error: 'Voter has already voted' });
            }

            const vote = await Vote.create(req.body);
            res.status(201).json(vote);
        } catch (error) {
            res.status(500).json({ error: 'Error creating vote' });
        }
    }

    async getAll(req, res) {
        try {
            const votes = await Vote.findAll();
            res.json(votes);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching votes' });
        }
    }

    async getStatistics(req, res) {
        try {
            const statistics = await Vote.getStatistics();
            res.json(statistics);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching statistics' });
        }
    }
}

module.exports = new VoteController();