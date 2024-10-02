import {
    BadRequestSchema,
    RepositoryErrorSchema,
    UnauthorizedSchema,
    NotFoundSchema,
} from '../../../common/swagger/errors';

const UbicacionesSchema = {
    crearUbicacion: {
        description: 'Crear una nueva ubicación',
        tags: ['Ubicaciones'],
        security: [{ JWT: [] }],
        body: {
            type: 'object',
            properties: {
                nombre: { type: 'string' },
                direccion: { type: 'string' },
                latitud: { type: 'number' },
                longitud: { type: 'number' },
            },
            required: ['nombre', 'direccion', 'latitud', 'longitud'],
        },
        response: {
            201: {
                description: 'Ubicación creada exitosamente',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: {
                        type: 'object',
                        properties: {
                            ok: { type: 'string', example: 'Ubicación creada exitosamente' },
                            data: {
                                type: 'object',
                                properties: {
                                    id_ubicacion: { type: 'integer' },
                                    nombre: { type: 'string' },
                                    direccion: { type: 'string' },
                                    latitud: { type: 'number' },
                                    longitud: { type: 'number' },
                                    creado_en: { type: 'string', format: 'date-time' },
                                    actualizado_en: { type: 'string', format: 'date-time' },
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
    actualizarUbicacion: {
        description: 'Actualizar una ubicación existente',
        tags: ['Ubicaciones'],
        security: [{ JWT: [] }],
        body: {
            type: 'object',
            properties: {
                id_ubicacion: { type: 'integer' },
                nombre: { type: 'string' },
                direccion: { type: 'string' },
                latitud: { type: 'number' },
                longitud: { type: 'number' },
            },
            required: ['id_ubicacion'],
        },
        response: {
            200: {
                description: 'Ubicación actualizada exitosamente',
                type: 'object',
                properties: {
                    id_ubicacion: { type: 'integer' },
                    nombre: { type: 'string' },
                    direccion: { type: 'string' },
                    latitud: { type: 'number' },
                    longitud: { type: 'number' },
                    creado_en: { type: 'string', format: 'date-time' },
                    actualizado_en: { type: 'string', format: 'date-time' },
                },
            },
            400: BadRequestSchema,
            401: UnauthorizedSchema,
            404: NotFoundSchema,
            500: RepositoryErrorSchema,
        },
    },
    eliminarUbicacion: {
        description: 'Eliminar una ubicación',
        tags: ['Ubicaciones'],
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
                description: 'Ubicación eliminada exitosamente',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: {
                        type: 'object',
                        properties: {
                            ok: { type: 'string', example: 'Ubicación eliminada exitosamente' },
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
    consultarUbicacion: {
        description: 'Consultar una ubicación por ID',
        tags: ['Ubicaciones'],
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
                description: 'Ubicación encontrada',
                type: 'object',
                properties: {
                    id_ubicacion: { type: 'integer' },
                    nombre: { type: 'string' },
                    direccion: { type: 'string' },
                    latitud: { type: 'number' },
                    longitud: { type: 'number' },
                    creado_en: { type: 'string', format: 'date-time' },
                    actualizado_en: { type: 'string', format: 'date-time' },
                },
            },
            400: BadRequestSchema,
            401: UnauthorizedSchema,
            404: NotFoundSchema,
            500: RepositoryErrorSchema,
        },
    },
    listarUbicaciones: {
        description: 'Listar todas las ubicaciones',
        tags: ['Ubicaciones'],
        security: [{ JWT: [] }],
        response: {
            200: {
                description: 'Lista de ubicaciones',
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id_ubicacion: { type: 'integer' },
                        nombre: { type: 'string' },
                        direccion: { type: 'string' },
                        latitud: { type: 'number' },
                        longitud: { type: 'number' },
                        creado_en: { type: 'string', format: 'date-time' },
                        actualizado_en: { type: 'string', format: 'date-time' },
                    },
                },
            },
            401: UnauthorizedSchema,
            500: RepositoryErrorSchema,
        },
    },
};

export default UbicacionesSchema;
