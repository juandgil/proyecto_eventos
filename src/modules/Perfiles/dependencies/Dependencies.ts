import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import PostgresPerfilesRepository from '@infrastructure/bd/dao/PostgresPerfilesRepository';
import TYPESDEPENDENCIES from './TypesDependencies';
import { PerfilesRepository } from '../domain/repositories/PerfilesRepository';
import CrearPerfilUseCase from '../usecase/services/CrearPerfilUseCase';
import ActualizarPerfilUseCase from '../usecase/services/ActualizarPerfilUseCase';
import EliminarPerfilUseCase from '../usecase/services/EliminarPerfilUseCase';
import ConsultarPerfilUseCase from '../usecase/services/ConsultarPerfilUseCase';
import ListarPerfilesUseCase from '../usecase/services/ListarPerfilesUseCase';
import PerfilesController from '../controllers/PerfilesController';

const createDependencies = (): void => {
    DEPENDENCY_CONTAINER.bind<PerfilesRepository>(TYPESDEPENDENCIES.PerfilesRepository)
        .to(PostgresPerfilesRepository)
        .inSingletonScope();

    DEPENDENCY_CONTAINER.bind<CrearPerfilUseCase>(TYPESDEPENDENCIES.CrearPerfilUseCase)
        .to(CrearPerfilUseCase)
        .inSingletonScope();

    DEPENDENCY_CONTAINER.bind<ActualizarPerfilUseCase>(TYPESDEPENDENCIES.ActualizarPerfilUseCase)
        .to(ActualizarPerfilUseCase)
        .inSingletonScope();

    DEPENDENCY_CONTAINER.bind<EliminarPerfilUseCase>(TYPESDEPENDENCIES.EliminarPerfilUseCase)
        .to(EliminarPerfilUseCase)
        .inSingletonScope();

    DEPENDENCY_CONTAINER.bind<ConsultarPerfilUseCase>(TYPESDEPENDENCIES.ConsultarPerfilUseCase)
        .to(ConsultarPerfilUseCase)
        .inSingletonScope();

    DEPENDENCY_CONTAINER.bind<ListarPerfilesUseCase>(TYPESDEPENDENCIES.ListarPerfilesUseCase)
        .to(ListarPerfilesUseCase)
        .inSingletonScope();

    DEPENDENCY_CONTAINER.bind<PerfilesController>(TYPESDEPENDENCIES.PerfilesController)
        .to(PerfilesController)
        .inSingletonScope();
};

export default createDependencies;
