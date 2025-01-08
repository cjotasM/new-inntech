const db = require('../config/database');

class Vote {
    static async create({ voter_id, candidate_id }) {
        const query = 'INSERT INTO votes (voter_id, candidate_id) VALUES ($1, $2) RETURNING *';
        const values = [voter_id, candidate_id];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    static async findAll() {
        const query = `
            SELECT v.id, v.created_at, 
                   vr.name as voter_name, 
                   c.name as candidate_name 
            FROM votes v
            JOIN voters vr ON v.voter_id = vr.id
            JOIN candidates c ON v.candidate_id = c.id
        `;
        const { rows } = await db.query(query);
        return rows;
    }

    static async getStatistics() {
        const query = `
            SELECT 
                c.id,
                c.name,
                c.party,
                c.votes,
                ROUND(CAST(c.votes AS DECIMAL) / CAST((SELECT COUNT(*) FROM votes) AS DECIMAL) * 100, 2) as percentage
            FROM candidates c
            ORDER BY c.votes DESC
        `;
        const votersQuery = 'SELECT COUNT(*) as total FROM voters WHERE has_voted = true';
        
        const { rows: stats } = await db.query(query);
        const { rows: voters } = await db.query(votersQuery);
        
        return {
            candidates: stats,
            total_votes: voters[0].total
        };
    }

    static async hasVoted(voter_id) {
        const query = 'SELECT * FROM votes WHERE voter_id = $1';
        const { rows } = await db.query(query, [voter_id]);
        return rows.length > 0;
    }
}

module.exports = Vote;