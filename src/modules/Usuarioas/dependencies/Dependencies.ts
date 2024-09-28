import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';

import PostgresUsuariosRepository from '@infrastructure/bd/dao/PostgresUsuariosRepository';
import PostgresClientesRepository from '@infrastructure/bd/dao/PostgresClientesRepository';
import StatusGetController from '../controllers/StatusGetController';

import TYPESDEPENDENCIES from './TypesDependencies';
import UsuariosController from '../controllers/UsuariosController';
import CrearUsuariosUseCase from '../usecase/services/CrearUsuariosUseCase';
import { UsuariosRepository } from '../domain/repositories/UsuariosRepository';
import { ClientesRepository } from '../domain/repositories/ClientesRepository';
import CrearUsuariosSuiteUseCase from '../usecase/services/CrearUsuariosSuiteUseCase';
import AsociarPerfilUseCase from '../usecase/services/AsociarPerfilUseCase';

const createDependencies = (): void => {
    DEPENDENCY_CONTAINER.bind<UsuariosController>(TYPESDEPENDENCIES.UsuariosController)
        .to(UsuariosController)
        .inSingletonScope();
    DEPENDENCY_CONTAINER.bind<CrearUsuariosUseCase>(TYPESDEPENDENCIES.CrearUsuariosUseCase)
        .toDynamicValue(() => {
            return new CrearUsuariosUseCase();
        })
        .inSingletonScope();

    DEPENDENCY_CONTAINER.bind<CrearUsuariosSuiteUseCase>(TYPESDEPENDENCIES.CrearUsuariosSuiteUseCase)
        .toDynamicValue(() => {
            return new CrearUsuariosSuiteUseCase();
        })
        .inSingletonScope();

    DEPENDENCY_CONTAINER.bind<AsociarPerfilUseCase>(TYPESDEPENDENCIES.AsociarPerfilUseCase)
        .toDynamicValue(() => {
            return new AsociarPerfilUseCase();
        })
        .inSingletonScope();

    DEPENDENCY_CONTAINER.bind<UsuariosRepository>(TYPESDEPENDENCIES.UsuariosRepository)
        .to(PostgresUsuariosRepository)
        .inSingletonScope();
    DEPENDENCY_CONTAINER.bind<ClientesRepository>(TYPESDEPENDENCIES.ClientesRepository)
        .to(PostgresClientesRepository)
        .inSingletonScope();
    DEPENDENCY_CONTAINER.bind<StatusGetController>(TYPESDEPENDENCIES.StatusGetController)
        .to(StatusGetController)
        .inSingletonScope();
};

export default createDependencies;
