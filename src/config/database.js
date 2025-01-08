// src/config/database.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Test connection
const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('Conexión exitosa a Supabase');
        const result = await client.query('SELECT NOW()');
        console.log('Conexión verificada:', result.rows[0]);
        client.release();
        return true;
    } catch (error) {
        console.error('Error al conectar a Supabase:', error);
        throw error;
    }
};

module.exports = {
    query: (text, params) => pool.query(text, params),
    testConnection,
    pool
};