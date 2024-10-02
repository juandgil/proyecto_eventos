import { injectable, inject } from 'inversify';
import { UbicacionesRepository } from '../../domain/repositories/UbicacionesRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import Ubicaciones from '../../domain/entities/Ubicaciones';

@injectable()
export default class ListarUbicacionesUseCase {
    constructor(
        @inject(TYPESDEPENDENCIES.UbicacionesRepository) private ubicacionesRepository: UbicacionesRepository,
    ) {}

    async execute(): Promise<Ubicaciones[]> {
        return this.ubicacionesRepository.listar();
    }
}
