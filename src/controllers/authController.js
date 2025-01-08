const jwt = require('jsonwebtoken');
const db = require('../config/database');

class AuthController {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            // Validaciones básicas
            if (!name || !email || !password) {
                return res.status(400).json({
                    error: 'Todos los campos son requeridos'
                });
            }

            // Verificar si el email ya existe como votante
            const userExists = await db.query(
                'SELECT * FROM voters WHERE email = $1',
                [email]
            );

            if (userExists.rows.length > 0) {
                return res.status(400).json({
                    error: 'El email ya está registrado como votante'
                });
            }

            // Verificar si existe como candidato
            const candidateExists = await db.query(
                'SELECT * FROM candidates WHERE email = $1',
                [email]
            );

            if (candidateExists.rows.length > 0) {
                return res.status(400).json({
                    error: 'Este email pertenece a un candidato y no puede registrarse como votante'
                });
            }

            // Insertar nuevo usuario
            const result = await db.query(
                'INSERT INTO voters (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
                [name, email, password]
            );

            const user = result.rows[0];

            // Generar token
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            res.status(201).json({
                message: 'Usuario registrado exitosamente',
                user,
                token
            });
        } catch (error) {
            console.error('Error en registro:', error);
            res.status(500).json({
                error: 'Error al registrar usuario'
            });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Verificar usuario y contraseña usando pgcrypto
            const result = await db.query(
                `SELECT * FROM voters 
                 WHERE email = $1 
                 AND password = crypt($2, password)`,
                [email, password]
            );

            const user = result.rows[0];

            if (!user) {
                return res.status(401).json({
                    error: 'Credenciales inválidas'
                });
            }

            // Generar token
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            res.json({
                message: 'Login exitoso',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                token
            });
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({
                error: 'Error al iniciar sesión'
            });
        }
    }
}

module.exports = new AuthController();