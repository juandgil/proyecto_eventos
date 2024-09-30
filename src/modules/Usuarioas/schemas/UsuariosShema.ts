import { BadRequestSchema, RepositoryErrorSchema } from '../../../common/swagger/errors';

const UsuariosShema = {
    crearUsuario: {
        description: 'Crear un usuario',
        tags: ['Usuarios'],
        body: {
            type: 'object',
            properties: {
                nombre_usuario: { type: 'string', example: 'juan' }, // Cambiado de nombres a nombre_usuario
                correo: { type: 'string', example: 'juan.gil@coordinadora.com' }, // Sin cambios
                hash_contrasena: { type: 'string', example: 'hashed_password' }, // Agregado
                perfil_id: { type: 'integer', example: 1 }, // Cambiado de id_perfil a perfil_id
            },
        },
        response: {
            200: {
                description: 'Succesful response',
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
            204: {
                description: 'No Content',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: {
                        type: 'object',
                        properties: { ok: { type: 'string', example: 'El usuario ya existe' } },
                    },
                    timestamp: { type: 'string', format: 'date-time', example: '2030-07-21T17:32:28Z' },
                },
            },
            500: RepositoryErrorSchema,
        },
    },
    iniciarSesion: {
        description: 'Crear un usuario en suite y notifica',
        tags: ['Usuarios'],
        body: {
            type: 'object',
            properties: {
                nombres: { type: 'string', example: 'juan' },
                apellidos: { type: 'string', example: 'Usuario' },
                tipo_identificacion: { type: 'string', example: 'CC' },
                identificacion: { type: 'string', example: '123456789' },
                telefono: { type: 'string', example: '123456789' },
                correo: { type: 'string', example: 'juan.gil@coordinadora.com' },
                contrasena: { type: 'string', example: '1123*As' },
                codigo_cliente: { type: 'number', example: 1 },
            },
        },
        response: {
            200: {
                description: 'Succesful response',
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
            204: {
                description: 'No Content',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: {
                        type: 'object',
                        properties: { ok: { type: 'string', example: 'El usuario ya existe' } },
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
        body: {
            type: 'object',
            properties: {
                id_usuario: { type: 'integer', example: 1 },
                perfil: { type: 'integer', example: 1 },
            },
        },
        response: {
            200: {
                description: 'Succesful response',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: {
                        type: 'object',
                        properties: { ok: { type: 'string', example: 'El usuario fue asociado correctamente' } },
                    },
                    timestamp: { type: 'string', format: 'date-time', example: '2030-07-21T17:32:28Z' },
                },
            },
            400: BadRequestSchema,
            500: RepositoryErrorSchema,
        },
    },
};

export default UsuariosShema;
