import ENV from '@common/envs/Envs';
import { FastifyDynamicSwaggerOptions } from '@fastify/swagger';

export const swaggerConfig: FastifyDynamicSwaggerOptions = {
    routePrefix: `/${ENV.DOMAIN}/${ENV.SERVICE_NAME}/docs`,
    swagger: {
        info: {
            title: 'Proyecto Eventos',
            description: 'Este servicio se encarga todo lo relacionado con el manejo de los eventos',
            version: '0.1.0',
            contact: {
                name: 'juan david gil alvarez',
                email: 'juandavidgilalvarez@gmail.com',
            },
        },
        host: ENV.ENV === 'local' ? ':8081' : '',
        schemes: ENV.ENV === 'local' ? ['http'] : ['https'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    exposeRoute: true,
    hideUntagged: true,
};

export default swaggerConfig;
