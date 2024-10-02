import { IModule } from '@common/modules/IModule';
import { HTTPMETODO, Ruta } from '@common/modules/Ruta';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import authMiddleware from '@modules/auth/middleware/authMiddleware';
import TYPESDEPENDENCIES from './dependencies/TypesDependencies';
import createDependencies from './dependencies/Dependencies';
import UbicacionesController from './controllers/UbicacionesController';
import UbicacionesSchema from './schemas/UbicacionesSchemaSwagger';

export default class UbicacionesModule implements IModule {
    private moduloRuta = '/ubicaciones';

    constructor() {
        createDependencies();
    }

    getRutas = (): Ruta[] => {
        const ubicacionesController = DEPENDENCY_CONTAINER.get<UbicacionesController>(
            TYPESDEPENDENCIES.UbicacionesController,
        );
        return [
            {
                metodo: HTTPMETODO.POST,
                url: '/crear',
                evento: ubicacionesController.crearUbicacion.bind(ubicacionesController),
                schema: UbicacionesSchema.crearUbicacion,
                handler: {
                    preHandler: [authMiddleware],
                },
            },
            {
                metodo: HTTPMETODO.PUT,
                url: '/actualizar',
                evento: ubicacionesController.actualizarUbicacion.bind(ubicacionesController),
                schema: UbicacionesSchema.actualizarUbicacion,
                handler: {
                    preHandler: [authMiddleware],
                },
            },
            {
                metodo: HTTPMETODO.DELETE,
                url: '/eliminar/:id',
                evento: ubicacionesController.eliminarUbicacion.bind(ubicacionesController),
                schema: UbicacionesSchema.eliminarUbicacion,
                handler: {
                    preHandler: [authMiddleware],
                },
            },
            {
                metodo: HTTPMETODO.GET,
                url: '/consultar/:id',
                evento: ubicacionesController.consultarUbicacion.bind(ubicacionesController),
                schema: UbicacionesSchema.consultarUbicacion,
                handler: {
                    preHandler: [authMiddleware],
                },
            },
            {
                metodo: HTTPMETODO.GET,
                url: '/listar',
                evento: ubicacionesController.listarUbicaciones.bind(ubicacionesController),
                schema: UbicacionesSchema.listarUbicaciones,
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
