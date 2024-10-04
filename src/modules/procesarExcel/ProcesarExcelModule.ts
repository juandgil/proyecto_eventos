import { IModule } from '@common/modules/IModule';
import { HTTPMETODO, Ruta } from '@common/modules/Ruta';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import authMiddleware from '@modules/auth/middleware/authMiddleware';
import TYPESDEPENDENCIES from './dependencies/TypesDependencies';
import createDependencies from './dependencies/Dependencies';
import ProcesarExcelController from './controllers/ProcesarExcelController';
import ProcesarExcelSchema from './schemas/ProcesarExcelSchemaSwagger';

export default class ProcesarExcelModule implements IModule {
    private moduloRuta = '/procesar-excel';

    constructor() {
        createDependencies();
    }

    getRutas = (): Ruta[] => {
        const procesarExcelController = DEPENDENCY_CONTAINER.get<ProcesarExcelController>(
            TYPESDEPENDENCIES.ProcesarExcelController,
        );
        return [
            {
                metodo: HTTPMETODO.POST,
                url: '/subir',
                evento: procesarExcelController.subirArchivo.bind(procesarExcelController),
                schema: ProcesarExcelSchema.subirArchivo,
                handler: {
                    preHandler: [authMiddleware],
                },
            },
            {
                metodo: HTTPMETODO.GET,
                url: '/estado/:id',
                evento: procesarExcelController.consultarEstado.bind(procesarExcelController),
                schema: ProcesarExcelSchema.consultarEstado,
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
