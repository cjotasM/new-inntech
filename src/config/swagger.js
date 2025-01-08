// src/config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Sistema de Votaciones API',
            version: '1.0.0',
            description: 'API RESTful para gestionar un sistema de votaciones',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
                description: 'Servidor de desarrollo',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            },
            schemas: {
                Voter: {
                    type: 'object',
                    required: ['name', 'email', 'password'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Nombre del votante'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email único del votante'
                        },
                        password: {
                            type: 'string',
                            description: 'Contraseña del votante'
                        }
                    }
                },
                Candidate: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Nombre del candidato'
                        },
                        party: {
                            type: 'string',
                            description: 'Partido político del candidato'
                        }
                    }
                },
                Vote: {
                    type: 'object',
                    required: ['voter_id', 'candidate_id'],
                    properties: {
                        voter_id: {
                            type: 'integer',
                            description: 'ID del votante'
                        },
                        candidate_id: {
                            type: 'integer',
                            description: 'ID del candidato'
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.js'], // archivos que contienen las anotaciones
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;