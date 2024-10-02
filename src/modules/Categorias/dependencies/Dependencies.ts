import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import PostgresCategoriasRepository from '@infrastructure/bd/dao/PostgresCategoriasRepository';
import TYPESDEPENDENCIES from './TypesDependencies';
import CategoriasController from '../controllers/CategoriasController';
import { CategoriasRepository } from '../domain/repositories/CategoriasRepository';
import CrearCategoriaUseCase from '../usecase/services/CrearCategoriaUseCase';
import ActualizarCategoriaUseCase from '../usecase/services/ActualizarCategoriaUseCase';
import EliminarCategoriaUseCase from '../usecase/services/EliminarCategoriaUseCase';
import ConsultarCategoriaUseCase from '../usecase/services/ConsultarCategoriaUseCase';
import ListarCategoriasUseCase from '../usecase/services/ListarCategoriasUseCase';

export default function createDependencies(): void {
    DEPENDENCY_CONTAINER.bind<CategoriasController>(TYPESDEPENDENCIES.CategoriasController).to(CategoriasController);
    DEPENDENCY_CONTAINER.bind<CategoriasRepository>(TYPESDEPENDENCIES.CategoriasRepository).to(
        PostgresCategoriasRepository,
    );
    DEPENDENCY_CONTAINER.bind<CrearCategoriaUseCase>(TYPESDEPENDENCIES.CrearCategoriaUseCase).to(CrearCategoriaUseCase);
    DEPENDENCY_CONTAINER.bind<ActualizarCategoriaUseCase>(TYPESDEPENDENCIES.ActualizarCategoriaUseCase).to(
        ActualizarCategoriaUseCase,
    );
    DEPENDENCY_CONTAINER.bind<EliminarCategoriaUseCase>(TYPESDEPENDENCIES.EliminarCategoriaUseCase).to(
        EliminarCategoriaUseCase,
    );
    DEPENDENCY_CONTAINER.bind<ConsultarCategoriaUseCase>(TYPESDEPENDENCIES.ConsultarCategoriaUseCase).to(
        ConsultarCategoriaUseCase,
    );
    DEPENDENCY_CONTAINER.bind<ListarCategoriasUseCase>(TYPESDEPENDENCIES.ListarCategoriasUseCase).to(
        ListarCategoriasUseCase,
    );
}
