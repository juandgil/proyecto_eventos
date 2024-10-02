import { IModule } from '@common/modules/IModule';
import { HTTPMETODO, Ruta } from '@common/modules/Ruta';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import authMiddleware from '@modules/auth/middleware/authMiddleware';
import TYPESDEPENDENCIES from './dependencies/TypesDependencies';
import createDependencies from './dependencies/Dependencies';
import EventosController from './controllers/EventosController';
import EventosSchema from './schemas/EventosSchemaSwagger';

export default class EventosModule implements IModule {
    private moduloRuta = '/eventos';

    constructor() {
        createDependencies();
    }

    getRutas = (): Ruta[] => {
        const eventosController = DEPENDENCY_CONTAINER.get<EventosController>(TYPESDEPENDENCIES.EventosController);
        return [
            {
                metodo: HTTPMETODO.POST,
                url: '/crear',
                evento: eventosController.crearEvento.bind(eventosController),
                schema: EventosSchema.crearEvento,
                handler: {
                    preHandler: [authMiddleware],
                },
            },
            {
                metodo: HTTPMETODO.PUT,
                url: '/actualizar',
                evento: eventosController.actualizarEvento.bind(eventosController),
                schema: EventosSchema.actualizarEvento,
                handler: {
                    preHandler: [authMiddleware],
                },
            },
            {
                metodo: HTTPMETODO.DELETE,
                url: '/eliminar/:id',
                evento: eventosController.eliminarEvento.bind(eventosController),
                schema: EventosSchema.eliminarEvento,
                handler: {
                    preHandler: [authMiddleware],
                },
            },
            {
                metodo: HTTPMETODO.GET,
                url: '/consultar/:id',
                evento: eventosController.consultarEvento.bind(eventosController),
                schema: EventosSchema.consultarEvento,
                handler: {
                    preHandler: [authMiddleware],
                },
            },
            {
                metodo: HTTPMETODO.POST,
                url: '/listar',
                evento: eventosController.listarEventos.bind(eventosController),
                schema: EventosSchema.listarEventos,
                handler: {
                    preHandler: [authMiddleware],
                },
            },
        ];
    };

    get ruta(): string {
        return this.moduloRuta;
    }
}
