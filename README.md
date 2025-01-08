# Sistema de Votaciones API

API RESTful para gestionar un sistema de votaciones desarrollado con Node.js, Express y PostgreSQL.

## Características

- Autenticación JWT para proteger los endpoints
- Sistema de votación con validaciones
- Estadísticas de votación en tiempo real
- Documentación con Swagger
- Base de datos PostgreSQL alojada en Supabase
- Paginación en listados

## Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/cjotasM/sistema-votaciones.git
cd sistema-votaciones
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor:
```bash
# Modo desarrollo
npm run dev

```

## Documentación de la API

La documentación completa de la API está disponible en:
```
http://localhost:3000/api-docs
```

### Endpoints Principales

#### Autenticación
- `POST /auth/register`: Registrar nuevo usuario
- `POST /auth/login`: Iniciar sesión

#### Votantes
- `GET /voters`: Listar votantes
- `GET /voters/{id}`: Obtener votante por ID
- `DELETE /voters/{id}`: Eliminar votante

#### Candidatos
- `POST /candidates`: Crear candidato
- `GET /candidates`: Listar candidatos
- `GET /candidates/{id}`: Obtener candidato por ID
- `DELETE /candidates/{id}`: Eliminar candidato

#### Votos
- `POST /votes`: Emitir voto
- `GET /votes`: Listar votos
- `GET /votes/statistics`: Obtener estadísticas

## Ejemplos de Uso

### Capturas de Postman

En la carpeta `/postman_captures` del proyecto se encuentran screenshots que documentan las pruebas realizadas al API, incluyendo:

- Registro de usuarios
- Login y obtención de token JWT
- Creación de candidatos
- Proceso de votación
- Consulta de estadísticas
- Manejo de errores y validaciones

Estas capturas sirven como referencia visual de la funcionalidad del sistema y pueden ser utilizadas como guía para entender el flujo completo de la aplicación.

Para ver las pruebas:
1. Navega a la carpeta `/postman_captures`
2. Las imágenes están organizadas por funcionalidad
3. Cada imagen muestra la petición realizada y la respuesta obtenida

## Validaciones Implementadas

- Un votante no puede ser registrado como candidato y viceversa
- Cada votante puede emitir un único voto
- Validación de tokens JWT
- Verificación de existencia de candidatos y votantes
- Validación de datos de entrada

## Estructura del Proyecto

```
sistema-votaciones/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── swagger.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── candidateController.js
│   │   ├── voterController.js
│   │   └── voteController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── candidateRoutes.js
│   │   ├── voterRoutes.js
│   │   └── voteRoutes.js
│   └── app.js
├── .env
├── package.json
└── README.md
```

## Despliegue

El proyecto está configurado para usar una base de datos PostgreSQL en Supabase, lo que facilita el despliegue y escalabilidad.

## Consideraciones de Seguridad

- Las contraseñas se almacenan encriptadas
- Autenticación mediante JWT
- Validación de datos de entrada
- Manejo seguro de errores
- Control de acceso basado en roles

## Licencia

Este proyecto está bajo la Licencia ISC.