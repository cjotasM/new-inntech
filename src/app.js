const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const authRoutes = require('./routes/authRoutes');
const voterRoutes = require('./routes/voterRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const voteRoutes = require('./routes/voteRoutes');
const { authMiddleware } = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(express.json());

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas públicas
app.use('/auth', authRoutes);

// Rutas protegidas
app.use('/voters', authMiddleware, voterRoutes);
app.use('/candidates', authMiddleware, candidateRoutes);
app.use('/votes', authMiddleware, voteRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});

module.exports = app;