// test-connection.js
const db = require('./src/config/database');

async function testDatabaseConnection() {
    try {
        console.log('Iniciando prueba de conexión...');
        await db.testConnection();
        console.log('Conexión exitosa!');
        
        // Prueba una consulta simple
        const result = await db.query('SELECT version()');
        console.log('Versión de PostgreSQL:', result.rows[0]);
        
    } catch (error) {
        console.error('Error al conectar:', error);
    } finally {
        process.exit();
    }
}

testDatabaseConnection();