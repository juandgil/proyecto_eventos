import Asistencias from '../../../domain/entities/Asistencias';

export interface IListarAsistenciasOut {
    asistencias: Asistencias[];
    paginacion: {
        paginaActual: number;
        totalPaginas: number;
        totalAsistencias: number;
        asistenciasPorPagina: number;
    };
}
