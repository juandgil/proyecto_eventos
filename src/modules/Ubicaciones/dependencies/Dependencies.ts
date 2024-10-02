import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import PostgresUbicacionesRepository from '@infrastructure/bd/dao/PostgresUbicacionesRepository';
import TYPESDEPENDENCIES from './TypesDependencies';
import UbicacionesController from '../controllers/UbicacionesController';
import { UbicacionesRepository } from '../domain/repositories/UbicacionesRepository';
import CrearUbicacionUseCase from '../usecase/services/CrearUbicacionUseCase';
import ActualizarUbicacionUseCase from '../usecase/services/ActualizarUbicacionesUseCase';
import EliminarUbicacionUseCase from '../usecase/services/EliminarUbicacionUseCase';
import ConsultarUbicacionUseCase from '../usecase/services/ConsultarUbicacionesUseCase';
import ListarUbicacionesUseCase from '../usecase/services/ListarUbicacionesUseCase';

export default function createDependencies(): void {
    DEPENDENCY_CONTAINER.bind<UbicacionesController>(TYPESDEPENDENCIES.UbicacionesController).to(UbicacionesController);
    DEPENDENCY_CONTAINER.bind<UbicacionesRepository>(TYPESDEPENDENCIES.UbicacionesRepository).to(
        PostgresUbicacionesRepository,
    );
    DEPENDENCY_CONTAINER.bind<CrearUbicacionUseCase>(TYPESDEPENDENCIES.CrearUbicacionUseCase).to(CrearUbicacionUseCase);
    DEPENDENCY_CONTAINER.bind<ActualizarUbicacionUseCase>(TYPESDEPENDENCIES.ActualizarUbicacionUseCase).to(
        ActualizarUbicacionUseCase,
    );
    DEPENDENCY_CONTAINER.bind<EliminarUbicacionUseCase>(TYPESDEPENDENCIES.EliminarUbicacionUseCase).to(
        EliminarUbicacionUseCase,
    );
    DEPENDENCY_CONTAINER.bind<ConsultarUbicacionUseCase>(TYPESDEPENDENCIES.ConsultarUbicacionUseCase).to(
        ConsultarUbicacionUseCase,
    );
    DEPENDENCY_CONTAINER.bind<ListarUbicacionesUseCase>(TYPESDEPENDENCIES.ListarUbicacionesUseCase).to(
        ListarUbicacionesUseCase,
    );
}
