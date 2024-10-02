export interface ICrearEventoIn {
    titulo: string;
    descripcion?: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    id_creador: number;
    id_ubicacion: number;
    id_categoria: number;
}

export interface IActualizarEventoIn {
    id_evento: number;
    titulo?: string;
    descripcion?: string;
    fecha_inicio?: Date;
    fecha_fin?: Date;
    id_creador?: number;
    id_ubicacion?: number;
    id_categoria?: number;
}

export interface IListarEventosIn {
    page?: number;
    limit?: number;
    fecha_inicio?: Date;
    fecha_fin?: Date;
    id_categoria?: number;
    id_ubicacion?: number;
}

export interface IConsultarEventoIn {
    id: number;
}

export interface IEliminarEventoIn {
    id: number;
}
