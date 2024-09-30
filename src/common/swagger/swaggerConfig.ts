import ENV from '@common/envs/Envs';
import { FastifyDynamicSwaggerOptions } from '@fastify/swagger';

export const swaggerConfig: FastifyDynamicSwaggerOptions = {
    routePrefix: `/${ENV.DOMAIN}/${ENV.SERVICE_NAME}/docs`,
    swagger: {
        info: {
            title: 'Proyecto Eventos API',
            description: 'Este servicio se encarga de todo lo relacionado con el manejo de los eventos',
            version: '1.0.0',
            termsOfService: 'http://ejemplo.com/terms/',
            contact: {
                name: 'juan david gil alvarez',
                email: 'juandavidgilalvarez@gmail.com',
                url: 'http://ejemplo.com/contact',
            },
            license: {
                name: 'Apache 2.0',
                url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
            },
        },
        externalDocs: {
            description: 'Encuentra más información aquí',
            url: 'https://github.com/juandgil/proyecto_eventos',
        },
        host: ENV.ENV === 'local' ? 'localhost:8081' : 'api.tudominio.com',
        basePath: `/${ENV.DOMAIN}/${ENV.SERVICE_NAME}`,
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
            },
        },
        definitions: {
            Usuario: {
                type: 'object',
                required: ['nombre_usuario', 'correo', 'contrasena'],
                properties: {
                    id_usuario: {
                        type: 'integer',
                        format: 'int64',
                    },
                    nombre_usuario: {
                        type: 'string',
                    },
                    correo: {
                        type: 'string',
                    },
                    contrasena: {
                        type: 'string',
                    },
                    id_perfil: {
                        type: 'integer',
                        format: 'int32',
                    },
                },
            },
            LoginResponse: {
                type: 'object',
                properties: {
                    token: {
                        type: 'string',
                    },
                },
            },
            Error: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                    },
                    code: {
                        type: 'integer',
                        format: 'int32',
                    },
                },
            },
        },
    },
    exposeRoute: true,
    hideUntagged: true,
};

export default swaggerConfig;
