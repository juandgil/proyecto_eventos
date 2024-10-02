import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import PostgresEventosRepository from '@infrastructure/bd/dao/PostgresEventosRepository';
import TYPESDEPENDENCIES from './TypesDependencies';
import EventosController from '../controllers/EventosController';
import { EventosRepository } from '../domain/repositories/EventosRepository';
import CrearEventoUseCase from '../usecase/services/CrearEventoUseCase';
import ActualizarEventoUseCase from '../usecase/services/ActualizarEventoUseCase';
import EliminarEventoUseCase from '../usecase/services/EliminarEventoUseCase';
import ConsultarEventoUseCase from '../usecase/services/ConsultarEventoUseCase';
import ListarEventosUseCase from '../usecase/services/ListarEventosUseCase';

export default function createDependencies(): void {
    DEPENDENCY_CONTAINER.bind<EventosController>(TYPESDEPENDENCIES.EventosController).to(EventosController);
    DEPENDENCY_CONTAINER.bind<EventosRepository>(TYPESDEPENDENCIES.EventosRepository).to(PostgresEventosRepository);
    DEPENDENCY_CONTAINER.bind<CrearEventoUseCase>(TYPESDEPENDENCIES.CrearEventoUseCase).to(CrearEventoUseCase);
    DEPENDENCY_CONTAINER.bind<ActualizarEventoUseCase>(TYPESDEPENDENCIES.ActualizarEventoUseCase).to(
        ActualizarEventoUseCase,
    );
    DEPENDENCY_CONTAINER.bind<EliminarEventoUseCase>(TYPESDEPENDENCIES.EliminarEventoUseCase).to(EliminarEventoUseCase);
    DEPENDENCY_CONTAINER.bind<ConsultarEventoUseCase>(TYPESDEPENDENCIES.ConsultarEventoUseCase).to(
        ConsultarEventoUseCase,
    );
    DEPENDENCY_CONTAINER.bind<ListarEventosUseCase>(TYPESDEPENDENCIES.ListarEventosUseCase).to(ListarEventosUseCase);
}
