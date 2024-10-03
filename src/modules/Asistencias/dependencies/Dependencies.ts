import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import PostgresAsistenciasRepository from '@infrastructure/bd/dao/PostgresAsistenciasRepository';
import TYPESDEPENDENCIES from './TypesDependencies';
import AsistenciasController from '../controllers/AsistenciasController';
import { AsistenciasRepository } from '../domain/repositories/AsistenciasRepository';
import CrearAsistenciaUseCase from '../usecase/services/CrearAsistenciaUseCase';
import ConsultarAsistenciaUseCase from '../usecase/services/ConsultarAsistenciaUseCase';
import ListarAsistenciasUseCase from '../usecase/services/ListarAsistenciasUseCase';

export default function createDependencies(): void {
    DEPENDENCY_CONTAINER.bind<AsistenciasController>(TYPESDEPENDENCIES.AsistenciasController).to(AsistenciasController);
    DEPENDENCY_CONTAINER.bind<AsistenciasRepository>(TYPESDEPENDENCIES.AsistenciasRepository).to(
        PostgresAsistenciasRepository,
    );
    DEPENDENCY_CONTAINER.bind<CrearAsistenciaUseCase>(TYPESDEPENDENCIES.CrearAsistenciaUseCase).to(
        CrearAsistenciaUseCase,
    );
    DEPENDENCY_CONTAINER.bind<ConsultarAsistenciaUseCase>(TYPESDEPENDENCIES.ConsultarAsistenciaUseCase).to(
        ConsultarAsistenciaUseCase,
    );
    DEPENDENCY_CONTAINER.bind<ListarAsistenciasUseCase>(TYPESDEPENDENCIES.ListarAsistenciasUseCase).to(
        ListarAsistenciasUseCase,
    );
}
