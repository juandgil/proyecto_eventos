export interface ICrearUbicacionIn {
    nombre: string;
    direccion: string;
    latitud: number;
    longitud: number;
    descripcion?: string;
}

export interface IActualizarUbicacionIn {
    id_ubicacion: number;
    nombre?: string;
    direccion?: string;
    latitud?: number;
    longitud?: number;
    descripcion?: string;
}

// export interface IListarUbicacionesIn {
// }

export interface IConsultarUbicacionIn {
    id: number;
}

export interface IEliminarUbicacionIn {
    id: number;
}
