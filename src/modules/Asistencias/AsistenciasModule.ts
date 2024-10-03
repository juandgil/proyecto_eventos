import { IModule } from '@common/modules/IModule';
import { HTTPMETODO, Ruta } from '@common/modules/Ruta';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import authMiddleware from '@modules/auth/middleware/authMiddleware';
import TYPESDEPENDENCIES from './dependencies/TypesDependencies';
import createDependencies from './dependencies/Dependencies';
import AsistenciasController from './controllers/AsistenciasController';
import AsistenciasSchema from './schemas/AsistenciasSchemaSwagger';

export default class AsistenciasModule implements IModule {
    private moduloRuta = '/asistencias';

    constructor() {
        createDependencies();
    }

    getRutas = (): Ruta[] => {
        const asistenciasController = DEPENDENCY_CONTAINER.get<AsistenciasController>(
            TYPESDEPENDENCIES.AsistenciasController,
        );
        return [
            {
                metodo: HTTPMETODO.POST,
                url: '/crear',
                evento: asistenciasController.crearAsistencia.bind(asistenciasController),
                schema: AsistenciasSchema.crearAsistencia,
                handler: {
                    preHandler: [authMiddleware],
                },
            },
            {
                metodo: HTTPMETODO.GET,
                url: '/consultar/:id',
                evento: asistenciasController.consultarAsistencia.bind(asistenciasController),
                schema: AsistenciasSchema.consultarAsistencia,
                handler: {
                    preHandler: [authMiddleware],
                },
            },
            {
                metodo: HTTPMETODO.POST,
                url: '/listar',
                evento: asistenciasController.listarAsistencias.bind(asistenciasController),
                schema: AsistenciasSchema.listarAsistencias,
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
