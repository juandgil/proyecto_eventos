import { injectable, inject } from 'inversify';
import NotFoundException from '@common/http/exceptions/NotFoundException';
import BadMessageException from '@common/http/exceptions/BadMessageException';
import { UbicacionesRepository } from '../../domain/repositories/UbicacionesRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import Ubicaciones from '../../domain/entities/Ubicaciones';
import { IActualizarUbicacionIn } from '../dto/in/IUbicacionesIn';

@injectable()
export default class ActualizarUbicacionUseCase {
    constructor(
        @inject(TYPESDEPENDENCIES.UbicacionesRepository) private ubicacionesRepository: UbicacionesRepository,
    ) {}

    async execute(data: IActualizarUbicacionIn): Promise<Ubicaciones> {
        const ubicacionExistente = await this.ubicacionesRepository.consultar(data.id_ubicacion);
        if (!ubicacionExistente) {
            throw new NotFoundException(
                'Ubicación no encontrada',
                `No se encontró la ubicación con ID ${data.id_ubicacion}`,
            );
        }

        if (data.nombre) {
            const ubicacionConMismoNombre = await this.ubicacionesRepository.buscarPorNombre(data.nombre);
            if (
                ubicacionConMismoNombre &&
                ubicacionConMismoNombre.length > 0 &&
                ubicacionConMismoNombre[0].id_ubicacion !== data.id_ubicacion
            ) {
                throw new BadMessageException(
                    'Nombre de ubicación duplicado',
                    `Ya existe otra ubicación con el nombre ${data.nombre}`,
                );
            }
            ubicacionExistente.nombre = data.nombre;
        }

        if (data.direccion) ubicacionExistente.direccion = data.direccion;
        if (data.latitud) ubicacionExistente.latitud = data.latitud;
        if (data.longitud) ubicacionExistente.longitud = data.longitud;

        return this.ubicacionesRepository.actualizar(data.id_ubicacion, ubicacionExistente);
    }
}
