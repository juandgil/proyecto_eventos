import 'module-alias/register';
import 'reflect-metadata';
import ModulesFactory from '@common/modules/ModulesFactory';
import TYPESSERVER from '@infrastructure/app/server/TypeServer';
import UsuariosModules from '@modules/Usuarioas/UsuariosModule';
import PerfilesModule from '@modules/Perfiles/PerfilesModule';
import { globalDependencies } from '@common/dependencies/DependencyContainer';

async function bootstrap() {
    const modulesFactory = new ModulesFactory();
    const server = modulesFactory.createServer(TYPESSERVER.Fastify);
    globalDependencies();
    modulesFactory.initModules([UsuariosModules, PerfilesModule]);
    server?.start();
}
bootstrap();
