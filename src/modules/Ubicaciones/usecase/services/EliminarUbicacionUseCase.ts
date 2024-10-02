import { injectable, inject } from 'inversify';
import NotFoundException from '@common/http/exceptions/NotFoundException';
import { UbicacionesRepository } from '../../domain/repositories/UbicacionesRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';

@injectable()
export default class EliminarUbicacionUseCase {
    constructor(
        @inject(TYPESDEPENDENCIES.UbicacionesRepository) private ubicacionesRepository: UbicacionesRepository,
    ) {}

    async execute(idUbicacion: number): Promise<void> {
        const ubicacionExistente = await this.ubicacionesRepository.consultar(idUbicacion);
        if (!ubicacionExistente) {
            throw new NotFoundException('Ubicación no encontrada', `No se encontró la ubicación con ID ${idUbicacion}`);
        }

        await this.ubicacionesRepository.eliminar(idUbicacion);
    }
}
