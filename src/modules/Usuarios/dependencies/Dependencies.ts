import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';

import PostgresUsuariosRepository from '@infrastructure/bd/dao/PostgresUsuariosRepository';
import PostgresClientesRepository from '@infrastructure/bd/dao/PostgresClientesRepository';
import { PerfilesRepository } from '@modules/Perfiles/domain/repositories/PerfilesRepository';
import StatusGetController from '../controllers/StatusGetController';

import TYPESDEPENDENCIES from './TypesDependencies';
import UsuariosController from '../controllers/UsuariosController';
import CrearUsuariosUseCase from '../usecase/services/CrearUsuariosUseCase';
import { UsuariosRepository } from '../domain/repositories/UsuariosRepository';
import { ClientesRepository } from '../domain/repositories/ClientesRepository';
import AsociarPerfilUseCase from '../usecase/services/AsociarPerfilUseCase';
import GenerarTokenUseCase from '../usecase/services/GenerarTokenUseCase';

const createDependencies = (): void => {
    DEPENDENCY_CONTAINER.bind<UsuariosController>(TYPESDEPENDENCIES.UsuariosController)
        .to(UsuariosController)
        .inSingletonScope();
    DEPENDENCY_CONTAINER.bind<CrearUsuariosUseCase>(TYPESDEPENDENCIES.CrearUsuariosUseCase)
        .toDynamicValue(() => {
            return new CrearUsuariosUseCase(
                DEPENDENCY_CONTAINER.get<UsuariosRepository>(TYPESDEPENDENCIES.UsuariosRepository),
                DEPENDENCY_CONTAINER.get<PerfilesRepository>(TYPESDEPENDENCIES.PerfilesRepository),
            );
        })
        .inSingletonScope();
    DEPENDENCY_CONTAINER.bind<GenerarTokenUseCase>(TYPESDEPENDENCIES.GenerarTokenUseCase).to(GenerarTokenUseCase);

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
