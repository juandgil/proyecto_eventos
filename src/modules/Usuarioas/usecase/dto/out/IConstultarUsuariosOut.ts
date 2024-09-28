export interface IConstultarUsuariosOut {
    id_usuario: number;
    correo_usuario: string;
    activo: boolean;
    sincronizacion_suite: boolean;
    estado_sincronizacion: string;
    id_perfil: number;
    nombres: string;
    apellidos: string;
    tipo_identificacion: string;
    identificacion: string;
    telefono: string;
}
