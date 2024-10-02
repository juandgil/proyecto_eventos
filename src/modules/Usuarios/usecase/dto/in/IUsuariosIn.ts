export interface ICrearUsuariosIn {
    nombre_usuario: string;
    correo: string;
    contrasena: string;
    id_perfil?: number;
    hash_contrasena?: string;
    id_usuario?: number;
    activo?: boolean;
}

export interface ILoginUsuariosIn {
    correo: string;
    contrasena: string;
}

export interface IActualizarUsuarioIn {
    id_usuario: number;
    nombre_usuario?: string;
    correo?: string;
    contrasena?: string;
    id_perfil?: number;
}

export interface IEliminarUsuarioIn {
    id_usuario: number;
}
