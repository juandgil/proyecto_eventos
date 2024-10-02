import { IModule } from '@common/modules/IModule';
import { HTTPMETODO, Ruta } from '@common/modules/Ruta';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import authMiddleware from '@modules/auth/middleware/authMiddleware';
import TYPESDEPENDENCIES from './dependencies/TypesDependencies';
import createDependencies from './dependencies/Dependencies';
import PerfilesController from './controllers/PerfilesController';
import PerfilesSchema from './schemas/PerfilesSchemaSwagger';

export default class PerfilesModule implements IModule {
    private moduloRuta = '/perfiles';

    constructor() {
        createDependencies();
    }

    getRutas = (): Ruta[] => {
        const perfilesController = DEPENDENCY_CONTAINER.get<PerfilesController>(TYPESDEPENDENCIES.PerfilesController);
        return [
            {
                metodo: HTTPMETODO.POST,
                url: '/crear',
                evento: perfilesController.crearPerfil.bind(perfilesController),
                schema: PerfilesSchema.crearPerfil,
                handler: {
                    preHandler: [authMiddleware],
                },
            },
            {
                metodo: HTTPMETODO.PUT,
                url: '/actualizar',
                evento: perfilesController.actualizarPerfil.bind(perfilesController),
                schema: PerfilesSchema.actualizarPerfil,
                handler: {
                    preHandler: [authMiddleware],
                },
            },
            {
                metodo: HTTPMETODO.DELETE,
                url: '/eliminar/:id',
                evento: perfilesController.eliminarPerfil.bind(perfilesController),
                schema: PerfilesSchema.eliminarPerfil,
                handler: {
                    preHandler: [authMiddleware],
                },
            },
            {
                metodo: HTTPMETODO.GET,
                url: '/consultar/:id',
                evento: perfilesController.consultarPerfil.bind(perfilesController),
                schema: PerfilesSchema.consultarPerfil,
                handler: {
                    preHandler: [authMiddleware],
                },
            },
            {
                metodo: HTTPMETODO.GET,
                url: '/listar',
                evento: perfilesController.listarPerfiles.bind(perfilesController),
                schema: PerfilesSchema.listarPerfiles,
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
