const db = require('../config/database');

class Voter {
    static async create({ name, email, password }) {
        const query = 'INSERT INTO voters (name, email, password) VALUES ($1, $2, $3) RETURNING *';
        const values = [name, email, password];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    static async findAll(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const query = 'SELECT id, name, email, has_voted FROM voters ORDER BY id LIMIT $1 OFFSET $2';
        const { rows } = await db.query(query, [limit, offset]);
        const countQuery = 'SELECT COUNT(*) FROM voters';
        const { rows: countRows } = await db.query(countQuery);
        return {
            voters: rows,
            total: parseInt(countRows[0].count),
            page,
            limit
        };
    }

    static async findById(id) {
        const query = 'SELECT id, name, email, has_voted FROM voters WHERE id = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM voters WHERE email = $1';
        const { rows } = await db.query(query, [email]);
        return rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM voters WHERE id = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
}

module.exports = Voter;