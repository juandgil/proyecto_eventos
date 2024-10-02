import {
    BadRequestSchema,
    RepositoryErrorSchema,
    UnauthorizedSchema,
    NotFoundSchema,
} from '../../../common/swagger/errors';

const CategoriasSchema = {
    crearCategoria: {
        description: 'Crear una nueva categoría',
        tags: ['Categorias'],
        security: [{ JWT: [] }],
        body: {
            type: 'object',
            properties: {
                nombre: { type: 'string' },
            },
            required: ['nombre'],
        },
        response: {
            201: {
                description: 'Categoría creada exitosamente',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: {
                        type: 'object',
                        properties: {
                            ok: { type: 'string', example: 'Categoría creada exitosamente' },
                            data: {
                                type: 'object',
                                properties: {
                                    id_categoria: { type: 'integer' },
                                    nombre: { type: 'string' },
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
    actualizarCategoria: {
        description: 'Actualizar una categoría existente',
        tags: ['Categorias'],
        security: [{ JWT: [] }],
        body: {
            type: 'object',
            properties: {
                id_categoria: { type: 'integer' },
                nombre: { type: 'string' },
            },
            required: ['id_categoria', 'nombre'],
        },
        response: {
            200: {
                description: 'Categoría actualizada exitosamente',
                type: 'object',
                properties: {
                    id_categoria: { type: 'integer' },
                    nombre: { type: 'string' },
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
    eliminarCategoria: {
        description: 'Eliminar una categoría',
        tags: ['Categorias'],
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
                description: 'Categoría eliminada exitosamente',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: {
                        type: 'object',
                        properties: {
                            ok: { type: 'string', example: 'Categoría eliminada exitosamente' },
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
    consultarCategoria: {
        description: 'Consultar una categoría por ID',
        tags: ['Categorias'],
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
                description: 'Categoría encontrada',
                type: 'object',
                properties: {
                    id_categoria: { type: 'integer' },
                    nombre: { type: 'string' },
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
    listarCategorias: {
        description: 'Listar todas las categorías',
        tags: ['Categorias'],
        security: [{ JWT: [] }],
        response: {
            200: {
                description: 'Lista de categorías',
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id_categoria: { type: 'integer' },
                        nombre: { type: 'string' },
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

export default CategoriasSchema;
