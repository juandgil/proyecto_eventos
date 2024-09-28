import ENV from '@common/envs/Envs';
import { FastifyDynamicSwaggerOptions } from '@fastify/swagger';

export const swaggerConfig: FastifyDynamicSwaggerOptions = {
    routePrefix: `/${ENV.DOMAIN}/${ENV.SERVICE_NAME}/docs`,
    swagger: {
        info: {
            title: 'Microservice wms usuarios',
            description: 'Este microservicio se encarga todo lo relacionado con los usuarios de wms',
            version: '0.1.0',
            contact: {
                name: 'Coordinadora Mercantil S.A',
                url: 'http://www.coordinadora.com/',
                email: 'it@coordinadora.com',
            },
        },
        host: ENV.ENV === 'local' ? ':8080' : '',
        schemes: ENV.ENV === 'local' ? ['http'] : ['https'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    exposeRoute: true,
    hideUntagged: true,
};

export default swaggerConfig;
