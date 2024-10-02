export const BadRequestSchema = {
    description: 'Bad Request',
    type: 'object',
    properties: {
        isError: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Campo es requerido' },
        cause: { type: ['string', 'null'], example: 'Error: Campo es requerido' },
        stack: { type: ['string', 'null'], example: 'Error o null' },
        statusCode: { type: 'number', example: 400 },
        code: { type: 'string', example: 'BAD_REQUEST' },
        defaultMessage: { type: 'string', example: 'Error handler log' },
    },
};

export const RepositoryErrorSchema = {
    description: 'Repository Error',
    type: 'object',
    properties: {
        isError: { type: 'boolean', example: true },
        message: {
            type: 'string',
            example: 'Error al consultar: No matching bindings found for serviceIdentifier: Symbol(dbCm)',
        },
        cause: { type: ['string', 'null'], example: 'REPOSITORY_ERROR' },
        stack: { type: ['string', 'null'], example: 'Error o null' },
        statusCode: { type: 'number', example: 500 },
        code: { type: 'string', example: 'POSTGRES_ERROR' },
        defaultMessage: { type: 'string', example: 'Error handler log' },
    },
};

export const UnauthorizedSchema = {
    description: 'No autorizado',
    type: 'object',
    properties: {
        isError: { type: 'boolean', example: true },
        message: { type: 'string', example: 'No autorizado' },
        cause: { type: ['string', 'null'], example: 'Token inválido o expirado' },
        stack: { type: ['string', 'null'], example: 'Error o null' },
        statusCode: { type: 'number', example: 401 },
        code: { type: 'string', example: 'UNAUTHORIZED' },
        defaultMessage: { type: 'string', example: 'Error de autenticación' },
    },
};

export const NotFoundSchema = {
    description: 'Recurso no encontrado',
    type: 'object',
    properties: {
        isError: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Recurso no encontrado' },
        cause: { type: ['string', 'null'], example: 'El usuario solicitado no existe' },
        stack: { type: ['string', 'null'], example: 'Error o null' },
        statusCode: { type: 'number', example: 404 },
        code: { type: 'string', example: 'NOT_FOUND' },
        defaultMessage: { type: 'string', example: 'El recurso solicitado no se encontró' },
    },
};
