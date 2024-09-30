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
