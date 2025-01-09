const db = require('../config/database');

class Candidate {
    static async create({ name, party, email }) {
        const query = 'INSERT INTO candidates (name, party, email) VALUES ($1, $2, $3) RETURNING *';
        const values = [name, party, email];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM candidates WHERE email = $1';
        const { rows } = await db.query(query, [email]);
        return rows[0];
    }

    static async findAll(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const query = 'SELECT * FROM candidates ORDER BY id LIMIT $1 OFFSET $2';
        const countQuery = 'SELECT COUNT(*) FROM candidates';

        const [candidates, count] = await Promise.all([
            db.query(query, [limit, offset]),
            db.query(countQuery)
        ]);

        return {
            candidates: candidates.rows,
            total: parseInt(count.rows[0].count),
            page,
            totalPages: Math.ceil(count.rows[0].count / limit)
        };
    }

    static async findById(id) {
        const query = 'SELECT * FROM candidates WHERE id = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM candidates WHERE id = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async checkVoterExists(email) {
        const query = 'SELECT id FROM voters WHERE email = $1';
        const { rows } = await db.query(query, [email]);
        return rows.length > 0;
    }
}

module.exports = Candidate;