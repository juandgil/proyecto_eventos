export interface ICrearAsistenciaIn {
    id_usuario: number;
    id_evento: number;
}

export interface IListarAsistenciasIn {
    page?: number;
    limit?: number;
    id_usuario?: number;
    id_evento?: number;
}

export interface IConsultarAsistenciaIn {
    id: number;
}

export interface IEliminarAsistenciaIn {
    id: number;
}
