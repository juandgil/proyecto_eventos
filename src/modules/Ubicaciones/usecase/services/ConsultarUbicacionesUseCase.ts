import { injectable, inject } from 'inversify';
import NotFoundException from '@common/http/exceptions/NotFoundException';
import { UbicacionesRepository } from '../../domain/repositories/UbicacionesRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import Ubicaciones from '../../domain/entities/Ubicaciones';

@injectable()
export default class ConsultarUbicacionUseCase {
    constructor(
        @inject(TYPESDEPENDENCIES.UbicacionesRepository) private ubicacionesRepository: UbicacionesRepository,
    ) {}

    async execute(idUbicacion: number): Promise<Ubicaciones> {
        const ubicacion = await this.ubicacionesRepository.consultar(idUbicacion);
        if (!ubicacion) {
            throw new NotFoundException('Ubicación no encontrada', `No se encontró la ubicación con ID ${idUbicacion}`);
        }
        return ubicacion;
    }
}
