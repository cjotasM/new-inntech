const db = require('../config/database');

class Candidate {
    static async create({ name, party }) {
        const query = 'INSERT INTO candidates (name, party) VALUES ($1, $2) RETURNING *';
        const values = [name, party];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    static async findAll(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const query = 'SELECT * FROM candidates ORDER BY id LIMIT $1 OFFSET $2';
        const { rows } = await db.query(query, [limit, offset]);
        const countQuery = 'SELECT COUNT(*) FROM candidates';
        const { rows: countRows } = await db.query(countQuery);
        return {
            candidates: rows,
            total: parseInt(countRows[0].count),
            page,
            limit
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
}

module.exports = Candidate;