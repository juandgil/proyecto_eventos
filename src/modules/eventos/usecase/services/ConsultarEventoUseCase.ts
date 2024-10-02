import { injectable, inject } from 'inversify';
import NotFoundException from '@common/http/exceptions/NotFoundException';
import { EventosRepository } from '../../domain/repositories/EventosRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import Eventos from '../../domain/entities/Eventos';
import { IConsultarEventoOut } from '../dto/out/IConsultarEventosOut';

@injectable()
export default class ConsultarEventoUseCase {
    constructor(@inject(TYPESDEPENDENCIES.EventosRepository) private eventosRepository: EventosRepository) {}

    async execute(idEvento: number): Promise<IConsultarEventoOut> {
        const evento = await this.eventosRepository.consultar(idEvento);
        if (!evento) {
            throw new NotFoundException('Evento no encontrado', `No se encontró el evento con ID ${idEvento}`);
        }

        const [creador, ubicacion, categoria] = await Promise.all([
            this.eventosRepository.obtenerCreador(evento.id_creador),
            this.eventosRepository.obtenerUbicacion(evento.id_ubicacion),
            this.eventosRepository.obtenerCategoria(evento.id_categoria),
        ]);

        return this.construirEventoDTO(evento, creador, ubicacion, categoria);
    }

    private construirEventoDTO(
        evento: Eventos,
        creador: { id_usuario: number; nombre_usuario: string },
        ubicacion: { id_ubicacion: number; nombre: string; direccion: string },
        categoria: { id_categoria: number; nombre: string },
    ): IConsultarEventoOut {
        return {
            id_evento: evento.id_evento ?? 0,
            titulo: evento.titulo ?? '',
            descripcion: evento.descripcion ?? '',
            fecha_inicio: evento.fecha_inicio ?? new Date(),
            fecha_fin: evento.fecha_fin ?? new Date(),
            creador: {
                id_usuario: creador.id_usuario,
                nombre_usuario: creador.nombre_usuario,
            },
            ubicacion: {
                id_ubicacion: ubicacion.id_ubicacion,
                nombre: ubicacion.nombre,
                direccion: ubicacion.direccion,
            },
            categoria: {
                id_categoria: categoria.id_categoria,
                nombre: categoria.nombre,
            },
            creado_en: evento.creado_en ?? new Date(),
            actualizado_en: evento.actualizado_en ?? new Date(),
        };
    }
}
