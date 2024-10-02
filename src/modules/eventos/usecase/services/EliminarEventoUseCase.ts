import { injectable, inject } from 'inversify';
import NotFoundException from '@common/http/exceptions/NotFoundException';
import BadMessageException from '@common/http/exceptions/BadMessageException';
import { EventosRepository } from '../../domain/repositories/EventosRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';

@injectable()
export default class EliminarEventoUseCase {
    constructor(@inject(TYPESDEPENDENCIES.EventosRepository) private eventosRepository: EventosRepository) {}

    async execute(idEvento: number): Promise<void> {
        const eventoExistente = await this.eventosRepository.consultar(idEvento);
        if (!eventoExistente) {
            throw new NotFoundException('Evento no encontrado', `No se encontró el evento con ID ${idEvento}`);
        }

        // Verificar si el evento ya ha ocurrido
        if (new Date() > eventoExistente.fecha_fin) {
            throw new BadMessageException('Evento no eliminable', 'No se puede eliminar un evento que ya ha ocurrido');
        }

        // Verificar si hay asistentes registrados
        const tieneAsistentes = await this.eventosRepository.tieneAsistentes(idEvento);
        if (tieneAsistentes) {
            throw new BadMessageException(
                'Evento no eliminable',
                'No se puede eliminar un evento que tiene asistentes registrados',
            );
        }

        // Eliminar el evento
        await this.eventosRepository.eliminar(idEvento);
    }
}
