export interface ICrearUsuariosIn {
    nombre_usuario: string;
    correo: string;
    contrasena: string;
    perfil_id: number;
    hash_contrasena?: string;
    id?: number;
}
