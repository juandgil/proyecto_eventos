import 'module-alias/register';
import 'reflect-metadata';
import ModulesFactory from '@common/modules/ModulesFactory';
import TYPESSERVER from '@infrastructure/app/server/TypeServer';
import UsuariosModules from '@modules/Usuarios/UsuariosModule';
import PerfilesModule from '@modules/Perfiles/PerfilesModule';
import CategoriasModule from '@modules/Categorias/CategoriasModule';
import { globalDependencies } from '@common/dependencies/DependencyContainer';
import UbicacionesModule from '@modules/Ubicaciones/UbicacionesModule';
import EventosModule from '@modules/eventos/EventosModule';
import AsistenciasModule from '@modules/Asistencias/AsistenciasModule';
import ProcesarExcelModule from '@modules/procesarExcel/ProcesarExcelModule';

async function bootstrap() {
    const modulesFactory = new ModulesFactory();
    const server = modulesFactory.createServer(TYPESSERVER.Fastify);
    globalDependencies();
    modulesFactory.initModules([
        UsuariosModules,
        PerfilesModule,
        CategoriasModule,
        UbicacionesModule,
        EventosModule,
        AsistenciasModule,
        ProcesarExcelModule,
    ]);
    server?.start();
}
bootstrap();
