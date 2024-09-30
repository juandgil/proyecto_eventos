export interface ICrearUsuariosIn {
    nombre_usuario: string;
    correo: string;
    contrasena: string;
    id_perfil: number;
    hash_contrasena?: string;
    id_usuario?: number;
}
