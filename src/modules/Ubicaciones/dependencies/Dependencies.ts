import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import ApiServiceAxios from '@common/http/services/apiServiceAxios';
import PostgresUbicacionesRepository from '@infrastructure/bd/dao/PostgresUbicacionesRepository';
import { AxiosRepository } from '@common/http/repositories/AxiosRepository';
import TYPESDEPENDENCIES from './TypesDependencies';
import UbicacionesController from '../controllers/UbicacionesController';
import { UbicacionesRepository } from '../domain/repositories/UbicacionesRepository';
import CrearUbicacionUseCase from '../usecase/services/CrearUbicacionUseCase';
import ActualizarUbicacionUseCase from '../usecase/services/ActualizarUbicacionesUseCase';
import EliminarUbicacionUseCase from '../usecase/services/EliminarUbicacionUseCase';
import ConsultarUbicacionUseCase from '../usecase/services/ConsultarUbicacionesUseCase';
import ListarUbicacionesUseCase from '../usecase/services/ListarUbicacionesUseCase';
import ObtenerUbicacionesCercanasUseCase from '../usecase/services/ObtenerUbicacionesCercanasUseCase';

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
    DEPENDENCY_CONTAINER.bind<ObtenerUbicacionesCercanasUseCase>(
        TYPESDEPENDENCIES.ObtenerUbicacionesCercanasUseCase,
    ).to(ObtenerUbicacionesCercanasUseCase);
    DEPENDENCY_CONTAINER.bind<AxiosRepository>(TYPESDEPENDENCIES.ApiServiceAxios).to(ApiServiceAxios);
}
