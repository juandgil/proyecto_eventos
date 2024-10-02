import { injectable, inject } from 'inversify';
import { EventosRepository } from '../../domain/repositories/EventosRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import { IListarEventosIn } from '../dto/in/IEventosIn';
import { IListarEventosOut } from '../dto/out/IListarEventosOut';
import Eventos from '../../domain/entities/Eventos';

@injectable()
export default class ListarEventosUseCase {
    constructor(@inject(TYPESDEPENDENCIES.EventosRepository) private eventosRepository: EventosRepository) {}

    async execute(filtros: IListarEventosIn): Promise<IListarEventosOut> {
        const page = filtros.page ?? 1;
        const limit = filtros.limit ?? 10;

        // Aplicar filtros
        const eventos: Eventos[] = await this.eventosRepository.listar({
            page,
            limit,
            fecha_inicio: filtros.fecha_inicio,
            fecha_fin: filtros.fecha_fin,
            id_categoria: filtros.id_categoria,
            id_ubicacion: filtros.id_ubicacion,
        });

        // Obtener el total de eventos (sin paginación)
        const totalEventos = await this.eventosRepository.contarEventos({
            fecha_inicio: filtros.fecha_inicio,
            fecha_fin: filtros.fecha_fin,
            id_categoria: filtros.id_categoria,
            id_ubicacion: filtros.id_ubicacion,
        });

        // Calcular el total de páginas
        const totalPaginas = Math.ceil(totalEventos / limit);

        return {
            eventos,
            paginacion: {
                paginaActual: page,
                totalPaginas,
                totalEventos,
                eventosPorPagina: limit,
            },
        };
    }
}
