import { IModule } from '@common/modules/IModule';
import { HTTPMETODO, Ruta } from '@common/modules/Ruta';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import authMiddleware from '@modules/auth/middleware/authMiddleware';
import TYPESDEPENDENCIES from './dependencies/TypesDependencies';
import createDependencies from './dependencies/Dependencies';
import CategoriasController from './controllers/CategoriasController';
import CategoriasSchema from './schemas/CategoriasSchemaSwagger';

export default class CategoriasModule implements IModule {
    private moduloRuta = '/categorias';

    constructor() {
        createDependencies();
    }

    getRutas = (): Ruta[] => {
        const categoriasController = DEPENDENCY_CONTAINER.get<CategoriasController>(
            TYPESDEPENDENCIES.CategoriasController,
        );
        return [
            {
                metodo: HTTPMETODO.POST,
                url: '/crear',
                evento: categoriasController.crearCategoria.bind(categoriasController),
                schema: CategoriasSchema.crearCategoria,
                handler: {
                    preHandler: [authMiddleware],
                },
            },
            {
                metodo: HTTPMETODO.PUT,
                url: '/actualizar',
                evento: categoriasController.actualizarCategoria.bind(categoriasController),
                schema: CategoriasSchema.actualizarCategoria,
                handler: {
                    preHandler: [authMiddleware],
                },
            },
            {
                metodo: HTTPMETODO.DELETE,
                url: '/eliminar/:id',
                evento: categoriasController.eliminarCategoria.bind(categoriasController),
                schema: CategoriasSchema.eliminarCategoria,
                handler: {
                    preHandler: [authMiddleware],
                },
            },
            {
                metodo: HTTPMETODO.GET,
                url: '/consultar/:id',
                evento: categoriasController.consultarCategoria.bind(categoriasController),
                schema: CategoriasSchema.consultarCategoria,
                handler: {
                    preHandler: [authMiddleware],
                },
            },
            {
                metodo: HTTPMETODO.GET,
                url: '/listar',
                evento: categoriasController.listarCategorias.bind(categoriasController),
                schema: CategoriasSchema.listarCategorias,
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
