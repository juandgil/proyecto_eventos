import {
    BadRequestSchema,
    RepositoryErrorSchema,
    UnauthorizedSchema,
    NotFoundSchema,
} from '../../../common/swagger/errors';

const EventosSchema = {
    crearEvento: {
        description: 'Crear un nuevo evento',
        tags: ['Eventos'],
        security: [{ JWT: [] }],
        body: {
            type: 'object',
            properties: {
                titulo: { type: 'string' },
                descripcion: { type: 'string' },
                fecha_inicio: { type: 'string', format: 'date-time' },
                fecha_fin: { type: 'string', format: 'date-time' },
                id_creador: { type: 'integer' },
                id_ubicacion: { type: 'integer' },
                id_categoria: { type: 'integer' },
            },
            required: ['titulo', 'fecha_inicio', 'fecha_fin', 'id_creador', 'id_ubicacion', 'id_categoria'],
        },
        response: {
            201: {
                description: 'Evento creado exitosamente',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: {
                        type: 'object',
                        properties: {
                            ok: { type: 'string', example: 'Evento creado exitosamente' },
                            data: {
                                type: 'object',
                                properties: {
                                    id_evento: { type: 'integer' },
                                    titulo: { type: 'string' },
                                    descripcion: { type: 'string' },
                                    fecha_inicio: { type: 'string', format: 'date-time' },
                                    fecha_fin: { type: 'string', format: 'date-time' },
                                    id_creador: { type: 'integer' },
                                    id_ubicacion: { type: 'integer' },
                                    id_categoria: { type: 'integer' },
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
    actualizarEvento: {
        description: 'Actualizar un evento existente',
        tags: ['Eventos'],
        security: [{ JWT: [] }],
        body: {
            type: 'object',
            properties: {
                id_evento: { type: 'integer' },
                titulo: { type: 'string' },
                descripcion: { type: 'string' },
                fecha_inicio: { type: 'string', format: 'date-time' },
                fecha_fin: { type: 'string', format: 'date-time' },
                id_creador: { type: 'integer' },
                id_ubicacion: { type: 'integer' },
                id_categoria: { type: 'integer' },
            },
            required: ['id_evento'],
        },
        response: {
            200: {
                description: 'Evento actualizado exitosamente',
                type: 'object',
                properties: {
                    id_evento: { type: 'integer' },
                    titulo: { type: 'string' },
                    descripcion: { type: 'string' },
                    fecha_inicio: { type: 'string', format: 'date-time' },
                    fecha_fin: { type: 'string', format: 'date-time' },
                    id_creador: { type: 'integer' },
                    id_ubicacion: { type: 'integer' },
                    id_categoria: { type: 'integer' },
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
    eliminarEvento: {
        description: 'Eliminar un evento',
        tags: ['Eventos'],
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
                description: 'Evento eliminado exitosamente',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: {
                        type: 'object',
                        properties: {
                            ok: { type: 'string', example: 'Evento eliminado exitosamente' },
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
    consultarEvento: {
        description: 'Consultar un evento por ID',
        tags: ['Eventos'],
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
                description: 'Evento encontrado',
                type: 'object',
                properties: {
                    id_evento: { type: 'integer' },
                    titulo: { type: 'string' },
                    descripcion: { type: 'string' },
                    fecha_inicio: { type: 'string', format: 'date-time' },
                    fecha_fin: { type: 'string', format: 'date-time' },
                    creador: {
                        type: 'object',
                        properties: {
                            id_usuario: { type: 'integer' },
                            nombre_usuario: { type: 'string' },
                        },
                    },
                    ubicacion: {
                        type: 'object',
                        properties: {
                            id_ubicacion: { type: 'integer' },
                            nombre: { type: 'string' },
                            direccion: { type: 'string' },
                        },
                    },
                    categoria: {
                        type: 'object',
                        properties: {
                            id_categoria: { type: 'integer' },
                            nombre: { type: 'string' },
                        },
                    },
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
    listarEventos: {
        description: 'Listar eventos con filtros opcionales',
        tags: ['Eventos'],
        security: [{ JWT: [] }],
        querystring: {
            type: 'object',
            properties: {
                page: { type: 'integer', minimum: 1 },
                limit: { type: 'integer', minimum: 1 },
                fecha_inicio: { type: 'string', format: 'date-time' },
                fecha_fin: { type: 'string', format: 'date-time' },
                id_categoria: { type: 'integer' },
                id_ubicacion: { type: 'integer' },
            },
        },
        response: {
            200: {
                description: 'Lista de eventos',
                type: 'object',
                properties: {
                    eventos: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id_evento: { type: 'integer' },
                                titulo: { type: 'string' },
                                descripcion: { type: 'string' },
                                fecha_inicio: { type: 'string', format: 'date-time' },
                                fecha_fin: { type: 'string', format: 'date-time' },
                                id_creador: { type: 'integer' },
                                id_ubicacion: { type: 'integer' },
                                id_categoria: { type: 'integer' },
                                creado_en: { type: 'string', format: 'date-time' },
                                actualizado_en: { type: 'string', format: 'date-time' },
                            },
                        },
                    },
                    paginacion: {
                        type: 'object',
                        properties: {
                            paginaActual: { type: 'integer' },
                            totalPaginas: { type: 'integer' },
                            totalEventos: { type: 'integer' },
                            eventosPorPagina: { type: 'integer' },
                        },
                    },
                },
            },
            401: UnauthorizedSchema,
            500: RepositoryErrorSchema,
        },
    },
};

export default EventosSchema;
