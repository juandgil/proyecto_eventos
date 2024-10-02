import { injectable, inject } from 'inversify';
import NotFoundException from '@common/http/exceptions/NotFoundException';
import BadMessageException from '@common/http/exceptions/BadMessageException';
import { EventosRepository } from '../../domain/repositories/EventosRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import Eventos from '../../domain/entities/Eventos';
import { IActualizarEventoIn } from '../dto/in/IEventosIn';

@injectable()
export default class ActualizarEventoUseCase {
    constructor(@inject(TYPESDEPENDENCIES.EventosRepository) private eventosRepository: EventosRepository) {}

    async execute(data: IActualizarEventoIn): Promise<Eventos> {
        const eventoExistente = await this.eventosRepository.consultar(data.id_evento);
        if (!eventoExistente) {
            throw new NotFoundException('Evento no encontrado', `No se encontró el evento con ID ${data.id_evento}`);
        }

        if (data.titulo) {
            const eventoConMismoTitulo = await this.eventosRepository.buscarPorTitulo(data.titulo);
            if (
                eventoConMismoTitulo &&
                eventoConMismoTitulo.length > 0 &&
                eventoConMismoTitulo[0].id_evento !== data.id_evento
            ) {
                throw new BadMessageException(
                    'Título de evento duplicado',
                    `Ya existe otro evento con el título ${data.titulo}`,
                );
            }
            eventoExistente.titulo = data.titulo;
        }

        if (data.descripcion) eventoExistente.descripcion = data.descripcion;
        if (data.fecha_inicio) eventoExistente.fecha_inicio = data.fecha_inicio;
        if (data.fecha_fin) eventoExistente.fecha_fin = data.fecha_fin;
        if (data.id_creador) eventoExistente.id_creador = data.id_creador;
        if (data.id_ubicacion) eventoExistente.id_ubicacion = data.id_ubicacion;
        if (data.id_categoria) eventoExistente.id_categoria = data.id_categoria;

        // Validar que la fecha de inicio sea anterior a la fecha de fin
        if (eventoExistente.fecha_inicio >= eventoExistente.fecha_fin) {
            throw new BadMessageException('Fechas inválidas', 'La fecha de inicio debe ser anterior a la fecha de fin');
        }

        // Validar que el creador, la ubicación y la categoría existan (esto podría hacerse en el repositorio)
        await this.validarRelaciones(eventoExistente);

        return this.eventosRepository.actualizar(data.id_evento, eventoExistente);
    }

    private async validarRelaciones(evento: Eventos): Promise<void> {
        const creadorExiste = await this.eventosRepository.existeCreador(evento.id_creador);
        if (!creadorExiste) {
            throw new NotFoundException(
                'Creador no encontrado',
                `No se encontró el creador con ID ${evento.id_creador}`,
            );
        }

        const ubicacionExiste = await this.eventosRepository.existeUbicacion(evento.id_ubicacion);
        if (!ubicacionExiste) {
            throw new NotFoundException(
                'Ubicación no encontrada',
                `No se encontró la ubicación con ID ${evento.id_ubicacion}`,
            );
        }

        const categoriaExiste = await this.eventosRepository.existeCategoria(evento.id_categoria);
        if (!categoriaExiste) {
            throw new NotFoundException(
                'Categoría no encontrada',
                `No se encontró la categoría con ID ${evento.id_categoria}`,
            );
        }
    }
}
