import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import PostgresProcesarExcelRepository from '@infrastructure/bd/dao/PostgresProcesarExcelRepository';
import TYPESDEPENDENCIES from './TypesDependencies';
import ProcesarExcelController from '../controllers/ProcesarExcelController';
import { ProcesarExcelRepository } from '../domain/repositories/ProcesarExcelRepository';
import SubirArchivoUseCase from '../usecase/services/SubirArchivoUseCase';
import ConsultarEstadoUseCase from '../usecase/services/ConsultarEstadoUseCase';

export default function createDependencies(): void {
    DEPENDENCY_CONTAINER.bind<ProcesarExcelController>(TYPESDEPENDENCIES.ProcesarExcelController).to(
        ProcesarExcelController,
    );
    DEPENDENCY_CONTAINER.bind<ProcesarExcelRepository>(TYPESDEPENDENCIES.ProcesarExcelRepository).to(
        PostgresProcesarExcelRepository,
    );
    DEPENDENCY_CONTAINER.bind<SubirArchivoUseCase>(TYPESDEPENDENCIES.SubirArchivoUseCase).to(SubirArchivoUseCase);
    DEPENDENCY_CONTAINER.bind<ConsultarEstadoUseCase>(TYPESDEPENDENCIES.ConsultarEstadoUseCase).to(
        ConsultarEstadoUseCase,
    );
}
