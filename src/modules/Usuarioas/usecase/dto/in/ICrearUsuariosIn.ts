export interface ICrearUsuariosIn {
    activo?: boolean;
    sincronizacion_suite?: boolean;
    estado_sincronizacion?: string;
    correo: string;
    id_perfil?: number;
    id_usuario?: number;
}
export interface IGuardarUsuariosFIn {
    nombres: string;
    apellidos: string;
    tipo_identificacion: string;
    identificacion: string;
    telefono?: string;
    correo: string;
    id_perfil?: number | null;
    id_usuario?: number;
}
