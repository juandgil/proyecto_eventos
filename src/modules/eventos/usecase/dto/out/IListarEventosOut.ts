import Eventos from '../../../domain/entities/Eventos';

export interface IListarEventosOut {
    eventos: Eventos[];
    paginacion: {
        paginaActual: number;
        totalPaginas: number;
        totalEventos: number;
        eventosPorPagina: number;
    };
}
