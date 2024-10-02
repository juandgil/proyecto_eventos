export interface ICrearCategoriaIn {
    nombre: string;
    descripcion: string;
}

export interface IActualizarCategoriaIn {
    id_categoria: number;
    nombre: string;
    descripcion: string;
}

// export interface IListarCategoriasIn {
// }

export interface IConsultarCategoriaIn {
    id: number;
}

export interface IEliminarCategoriaIn {
    id: number;
}
