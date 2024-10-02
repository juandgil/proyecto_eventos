import { injectable, inject } from 'inversify';
import BadMessageException from '@common/http/exceptions/BadMessageException';
import { UbicacionesRepository } from '@modules/Ubicaciones/domain/repositories/UbicacionesRepository';
import TYPESDEPENDENCIES from '@modules/Ubicaciones/dependencies/TypesDependencies';
import Ubicaciones from '@modules/Ubicaciones/domain/entities/Ubicaciones';
import { ICrearUbicacionIn } from '../dto/in/IUbicacionesIn';

@injectable()
export default class CrearUbicacionUseCase {
    constructor(
        @inject(TYPESDEPENDENCIES.UbicacionesRepository) private ubicacionesRepository: UbicacionesRepository,
    ) {}

    async execute(data: ICrearUbicacionIn): Promise<Ubicaciones> {
        const ubicacionExistente = await this.ubicacionesRepository.buscarPorNombre(data.nombre);
        if (ubicacionExistente && ubicacionExistente.length > 0) {
            throw new BadMessageException('Ubicación ya existe', 'Ya existe una ubicación con el mismo nombre');
        }
        return this.ubicacionesRepository.crear(data);
    }
}
