import { BadRequestSchema, RepositoryErrorSchema } from '../../../common/swagger/errors';

const UsuariosShema = {
    crearUsuario: {
        description: 'Crear un nuevo usuario',
        tags: ['Usuarios'],
        body: {
            type: 'object',
            required: ['nombre_usuario', 'correo', 'contrasena', 'id_perfil'],
            properties: {
                nombre_usuario: { type: 'string', example: 'juan' },
                correo: { type: 'string', example: 'juan.gil@coordinadora.com' },
                contrasena: { type: 'string', example: 'hashed_password' },
                id_perfil: { type: 'integer', example: 1 },
            },
        },
        response: {
            201: {
                description: 'Usuario creado exitosamente',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: {
                        type: 'object',
                        properties: { ok: { type: 'string', example: 'El usuario se ha creado correctamente' } },
                    },
                    timestamp: { type: 'string', format: 'date-time', example: '2030-07-21T17:32:28Z' },
                },
            },
            400: BadRequestSchema,
            409: {
                description: 'Conflicto - El usuario ya existe',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: true },
                    data: {
                        type: 'object',
                        properties: { error: { type: 'string', example: 'El usuario ya existe' } },
                    },
                    timestamp: { type: 'string', format: 'date-time', example: '2030-07-21T17:32:28Z' },
                },
            },
            500: RepositoryErrorSchema,
        },
    },
    iniciarSesion: {
        description: 'Iniciar sesión de usuario',
        tags: ['Autenticación'],
        body: {
            type: 'object',
            required: ['correo', 'contrasena'],
            properties: {
                correo: { type: 'string', example: 'juan.gil@coordinadora.com' },
                contrasena: { type: 'string', example: 'password123' },
            },
        },
        response: {
            200: {
                description: 'Inicio de sesión exitoso',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: {
                        type: 'object',
                        properties: {
                            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                            usuario: {
                                type: 'object',
                                properties: {
                                    id_usuario: { type: 'integer', example: 1 },
                                    nombre_usuario: { type: 'string', example: 'juan' },
                                    correo: { type: 'string', example: 'juan.gil@coordinadora.com' },
                                    perfil_id: { type: 'integer', example: 1 },
                                },
                            },
                        },
                    },
                    timestamp: { type: 'string', format: 'date-time', example: '2030-07-21T17:32:28Z' },
                },
            },
            400: BadRequestSchema,
            401: {
                description: 'Credenciales inválidas',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: true },
                    data: {
                        type: 'object',
                        properties: { error: { type: 'string', example: 'Credenciales inválidas' } },
                    },
                    timestamp: { type: 'string', format: 'date-time', example: '2030-07-21T17:32:28Z' },
                },
            },
            500: RepositoryErrorSchema,
        },
    },
    asociarPerfil: {
        description: 'Asociar un perfil a un usuario',
        tags: ['Usuarios'],
        security: [{ JWT: [] }],
        body: {
            type: 'object',
            required: ['id_usuario', 'id_perfil'],
            properties: {
                id_usuario: { type: 'integer', example: 1 },
                id_perfil: { type: 'integer', example: 1 },
            },
        },
        response: {
            200: {
                description: 'Perfil asociado exitosamente',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: {
                        type: 'object',
                        properties: {
                            ok: { type: 'string', example: 'El usuario fue asociado correctamente al perfil' },
                        },
                    },
                    timestamp: { type: 'string', format: 'date-time', example: '2030-07-21T17:32:28Z' },
                },
            },
            400: BadRequestSchema,
            401: {
                description: 'No autorizado - Token no proporcionado',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Token no proporcionado' },
                },
            },
            404: {
                description: 'Usuario o perfil no encontrado',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: true },
                    data: {
                        type: 'object',
                        properties: { error: { type: 'string', example: 'Usuario o perfil no encontrado' } },
                    },
                    timestamp: { type: 'string', format: 'date-time', example: '2030-07-21T17:32:28Z' },
                },
            },
            500: RepositoryErrorSchema,
        },
    },
};

export default UsuariosShema;
