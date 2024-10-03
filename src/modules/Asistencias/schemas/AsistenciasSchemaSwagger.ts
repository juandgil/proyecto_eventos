import {
    BadRequestSchema,
    RepositoryErrorSchema,
    UnauthorizedSchema,
    NotFoundSchema,
} from '../../../common/swagger/errors';

const AsistenciasSchema = {
    crearAsistencia: {
        description: 'Crear una nueva asistencia',
        tags: ['Asistencias'],
        security: [{ JWT: [] }],
        body: {
            type: 'object',
            properties: {
                id_usuario: { type: 'integer' },
                id_evento: { type: 'integer' },
            },
            required: ['id_usuario', 'id_evento'],
        },
        response: {
            201: {
                description: 'Asistencia creada exitosamente',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: {
                        type: 'object',
                        properties: {
                            ok: { type: 'string', example: 'Asistencia creada exitosamente' },
                            data: {
                                type: 'object',
                                properties: {
                                    id_asistencia: { type: 'integer' },
                                    id_usuario: { type: 'integer' },
                                    id_evento: { type: 'integer' },
                                    creado_en: { type: 'string', format: 'date-time' },
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
    eliminarAsistencia: {
        description: 'Eliminar una asistencia',
        tags: ['Asistencias'],
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
                description: 'Asistencia eliminada exitosamente',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: {
                        type: 'object',
                        properties: {
                            ok: { type: 'string', example: 'Asistencia eliminada exitosamente' },
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
    consultarAsistencia: {
        description: 'Consultar una asistencia por ID',
        tags: ['Asistencias'],
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
                description: 'Asistencia encontrada',
                type: 'object',
                properties: {
                    id_asistencia: { type: 'integer' },
                    usuario: {
                        type: 'object',
                        properties: {
                            id_usuario: { type: 'integer' },
                            nombre_usuario: { type: 'string' },
                        },
                    },
                    evento: {
                        type: 'object',
                        properties: {
                            id_evento: { type: 'integer' },
                            titulo: { type: 'string' },
                        },
                    },
                    creado_en: { type: 'string', format: 'date-time' },
                },
            },
            400: BadRequestSchema,
            401: UnauthorizedSchema,
            404: NotFoundSchema,
            500: RepositoryErrorSchema,
        },
    },
    listarAsistencias: {
        description: 'Listar asistencias con filtros opcionales',
        tags: ['Asistencias'],
        security: [{ JWT: [] }],
        body: {
            type: 'object',
            properties: {
                page: { type: 'integer', minimum: 1 },
                limit: { type: 'integer', minimum: 1 },
                id_usuario: { type: 'integer' },
                id_evento: { type: 'integer' },
            },
        },
        response: {
            200: {
                description: 'Lista de asistencias',
                type: 'object',
                properties: {
                    asistencias: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id_asistencia: { type: 'integer' },
                                id_usuario: { type: 'integer' },
                                id_evento: { type: 'integer' },
                                creado_en: { type: 'string', format: 'date-time' },
                            },
                        },
                    },
                    paginacion: {
                        type: 'object',
                        properties: {
                            paginaActual: { type: 'integer' },
                            totalPaginas: { type: 'integer' },
                            totalAsistencias: { type: 'integer' },
                            asistenciasPorPagina: { type: 'integer' },
                        },
                    },
                },
            },
            401: UnauthorizedSchema,
            500: RepositoryErrorSchema,
        },
    },
};

export default AsistenciasSchema;
