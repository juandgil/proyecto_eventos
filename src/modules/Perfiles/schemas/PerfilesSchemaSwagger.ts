import {
    BadRequestSchema,
    RepositoryErrorSchema,
    UnauthorizedSchema,
    NotFoundSchema,
} from '../../../common/swagger/errors';

const PerfilesSchema = {
    crearPerfil: {
        description: 'Crear un nuevo perfil',
        tags: ['Perfiles'],
        security: [{ JWT: [] }],
        body: {
            type: 'object',
            required: ['nombre', 'descripcion'],
            properties: {
                nombre: { type: 'string' },
                descripcion: { type: 'string' },
            },
        },
        response: {
            201: {
                description: 'Perfil creado exitosamente',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: {
                        type: 'object',
                        properties: {
                            ok: { type: 'string', example: 'Perfil creado exitosamente' },
                            data: {
                                type: 'object',
                                properties: {
                                    idPerfil: { type: 'integer' },
                                    nombre: { type: 'string' },
                                    descripcion: { type: 'string' },
                                    creadoEn: { type: 'string', format: 'date-time' },
                                    actualizadoEn: { type: 'string', format: 'date-time' },
                                },
                            },
                        },
                    },
                    timestamp: { type: 'string', format: 'date-time' },
                },
            },
            400: BadRequestSchema,
            401: UnauthorizedSchema,
            500: RepositoryErrorSchema,
        },
    },
    actualizarPerfil: {
        description: 'Actualizar un perfil existente',
        tags: ['Perfiles'],
        security: [{ JWT: [] }],
        body: {
            type: 'object',
            required: ['id_perfil'],
            properties: {
                id_perfil: { type: 'integer' },
                nombre: { type: 'string' },
                descripcion: { type: 'string' },
            },
        },
        response: {
            200: {
                description: 'Perfil actualizado exitosamente',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: {
                        type: 'object',
                        properties: {
                            ok: { type: 'string', example: 'Perfil actualizado exitosamente' },
                            data: {
                                type: 'object',
                                properties: {
                                    idPerfil: { type: 'integer' },
                                    nombre: { type: 'string' },
                                    descripcion: { type: 'string' },
                                    creadoEn: { type: 'string', format: 'date-time' },
                                    actualizadoEn: { type: 'string', format: 'date-time' },
                                },
                            },
                        },
                    },
                    timestamp: { type: 'string', format: 'date-time' },
                },
            },
            400: BadRequestSchema,
            401: UnauthorizedSchema,
            404: NotFoundSchema,
            500: RepositoryErrorSchema,
        },
    },
    eliminarPerfil: {
        description: 'Eliminar un perfil existente',
        tags: ['Perfiles'],
        security: [{ JWT: [] }],
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
            },
            required: ['id'],
        },
        response: {
            200: {
                description: 'Perfil eliminado exitosamente',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: {
                        type: 'object',
                        properties: {
                            ok: { type: 'string', example: 'Perfil eliminado exitosamente' },
                        },
                    },
                    timestamp: { type: 'string', format: 'date-time' },
                },
            },
            401: UnauthorizedSchema,
            404: NotFoundSchema,
            500: RepositoryErrorSchema,
        },
    },
    consultarPerfil: {
        description: 'Consultar un perfil por ID',
        tags: ['Perfiles'],
        security: [{ JWT: [] }],
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
            },
            required: ['id'],
        },
        response: {
            200: {
                description: 'Perfil encontrado',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: {
                        type: 'object',
                        properties: {
                            idPerfil: { type: 'integer' },
                            nombre: { type: 'string' },
                            descripcion: { type: 'string' },
                            creadoEn: { type: 'string', format: 'date-time' },
                            actualizadoEn: { type: 'string', format: 'date-time' },
                        },
                    },
                    timestamp: { type: 'string', format: 'date-time' },
                },
            },
            401: UnauthorizedSchema,
            404: NotFoundSchema,
            500: RepositoryErrorSchema,
        },
    },
    listarPerfiles: {
        description: 'Listar todos los perfiles',
        tags: ['Perfiles'],
        security: [{ JWT: [] }],
        response: {
            200: {
                description: 'Lista de perfiles',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                idPerfil: { type: 'integer' },
                                nombre: { type: 'string' },
                                descripcion: { type: 'string' },
                                creadoEn: { type: 'string', format: 'date-time' },
                                actualizadoEn: { type: 'string', format: 'date-time' },
                            },
                        },
                    },
                    timestamp: { type: 'string', format: 'date-time' },
                },
            },
            401: UnauthorizedSchema,
            500: RepositoryErrorSchema,
        },
    },
};

export default PerfilesSchema;
