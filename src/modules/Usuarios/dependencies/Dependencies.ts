import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import PostgresUsuariosRepository from '@infrastructure/bd/dao/PostgresUsuariosRepository';
import PostgresClientesRepository from '@infrastructure/bd/dao/PostgresClientesRepository';
import { PerfilesRepository } from '@modules/Perfiles/domain/repositories/PerfilesRepository';
import { IAuthService } from '@modules/services/IAuthService';
import TYPESDEPENDENCIES from './TypesDependencies';
import AuthService from '../../services/AuthService';
import StatusGetController from '../controllers/StatusGetController';
import UsuariosController from '../controllers/UsuariosController';
import { UsuariosRepository } from '../domain/repositories/UsuariosRepository';
import { ClientesRepository } from '../domain/repositories/ClientesRepository';
import CrearUsuariosUseCase from '../usecase/services/CrearUsuariosUseCase';
import AsociarPerfilUseCase from '../usecase/services/AsociarPerfilUseCase';
import GenerarTokenUseCase from '../usecase/services/GenerarTokenUseCase';
import ActualizarUsuarioUseCase from '../usecase/services/ActualizarUsuarioUseCase';
import InactivarUsuarioUseCase from '../usecase/services/InactivarUsuarioUseCase';
import ConsultarUsuarioUseCase from '../usecase/services/ConsultarUsuarioUseCase';
import ListarUsuariosUseCase from '../usecase/services/ListarUsuariosUseCase';

const createDependencies = (): void => {
    DEPENDENCY_CONTAINER.bind<UsuariosController>(TYPESDEPENDENCIES.UsuariosController)
        .to(UsuariosController)
        .inSingletonScope();
    DEPENDENCY_CONTAINER.bind<CrearUsuariosUseCase>(TYPESDEPENDENCIES.CrearUsuariosUseCase)
        .toDynamicValue(() => {
            return new CrearUsuariosUseCase(
                DEPENDENCY_CONTAINER.get<UsuariosRepository>(TYPESDEPENDENCIES.UsuariosRepository),
                DEPENDENCY_CONTAINER.get<PerfilesRepository>(TYPESDEPENDENCIES.PerfilesRepository),
                DEPENDENCY_CONTAINER.get<IAuthService>(TYPESDEPENDENCIES.AuthService),
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

    DEPENDENCY_CONTAINER.bind<IAuthService>(TYPESDEPENDENCIES.AuthService).to(AuthService).inSingletonScope();

    DEPENDENCY_CONTAINER.bind<ActualizarUsuarioUseCase>(TYPESDEPENDENCIES.ActualizarUsuarioUseCase).to(
        ActualizarUsuarioUseCase,
    );

    DEPENDENCY_CONTAINER.bind<InactivarUsuarioUseCase>(TYPESDEPENDENCIES.InactivarUsuarioUseCase)
        .to(InactivarUsuarioUseCase)
        .inSingletonScope();

    DEPENDENCY_CONTAINER.bind<ConsultarUsuarioUseCase>(TYPESDEPENDENCIES.ConsultarUsuarioUseCase)
        .to(ConsultarUsuarioUseCase)
        .inSingletonScope();

    DEPENDENCY_CONTAINER.bind<ListarUsuariosUseCase>(TYPESDEPENDENCIES.ListarUsuariosUseCase)
        .to(ListarUsuariosUseCase)
        .inSingletonScope();
};

export default createDependencies;
