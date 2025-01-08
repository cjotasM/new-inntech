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
                VoterInput: {
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
                            format: 'password',
                            minLength: 6,
                            description: 'Contraseña del votante (mínimo 6 caracteres)'
                        }
                    }
                },
                VoterResponse: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID autogenerado del votante'
                        },
                        name: {
                            type: 'string',
                            description: 'Nombre del votante'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email único del votante'
                        },
                        has_voted: {
                            type: 'boolean',
                            description: 'Indica si el votante ya ha emitido su voto',
                            default: false
                        }
                    }
                },
                CandidateInput: {
                    type: 'object',
                    required: ['name', 'email', 'party'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Nombre del candidato'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email único del candidato'
                        },
                        party: {
                            type: 'string',
                            description: 'Partido político del candidato'
                        }
                    }
                },
                CandidateResponse: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID autogenerado del candidato'
                        },
                        name: {
                            type: 'string',
                            description: 'Nombre del candidato'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email único del candidato'
                        },
                        party: {
                            type: 'string',
                            description: 'Partido político del candidato'
                        },
                        votes: {
                            type: 'integer',
                            description: 'Número de votos recibidos',
                            default: 0
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
                },
                VoteResponse: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID autogenerado del voto'
                        },
                        voter_id: {
                            type: 'integer',
                            description: 'ID del votante'
                        },
                        candidate_id: {
                            type: 'integer',
                            description: 'ID del candidato'
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha y hora del voto'
                        }
                    }
                },
                VoteStatistics: {
                    type: 'object',
                    properties: {
                        candidates: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'integer',
                                        description: 'ID del candidato'
                                    },
                                    name: {
                                        type: 'string',
                                        description: 'Nombre del candidato'
                                    },
                                    party: {
                                        type: 'string',
                                        description: 'Partido político'
                                    },
                                    votes: {
                                        type: 'integer',
                                        description: 'Número de votos recibidos'
                                    },
                                    percentage: {
                                        type: 'number',
                                        format: 'float',
                                        description: 'Porcentaje de votos recibidos'
                                    }
                                }
                            }
                        },
                        total_votes: {
                            type: 'integer',
                            description: 'Total de votos emitidos'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                            description: 'Mensaje de error'
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