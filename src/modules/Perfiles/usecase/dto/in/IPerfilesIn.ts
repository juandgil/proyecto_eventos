export interface IConstultarPerfilesIn {
    id: number;
    existe: boolean;
}

export interface ICrearPerfilIn {
    nombre: string;
    descripcion: string;
}

export interface IActualizarPerfilIn {
    id_perfil: number;
    nombre: string;
    descripcion: string;
}

export interface IListarPerfilesIn {
    id_perfil: number;
    nombre: string;
    descripcion: string;
}

export interface IEliminarPerfilIn {
    id: number;
}
