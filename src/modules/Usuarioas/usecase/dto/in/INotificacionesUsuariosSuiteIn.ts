export interface INotificacionUsuariosSuiteIn {
    nombres: string;
    apellidos: string;
    tipo_identificacion: string;
    identificacion: string;
    telefono?: string;
    correo: string;
    contrasena: string;
    codigo_cliente: number;
}

export interface TokenUsuario {
    id_token_usuario?: number;
    valor: string;
    activo: boolean;
    id_usuario: number | undefined;
    fecha_hora_expiracion: Date;
    fecha_hora_creacion: Date;
}
export interface FechasToken {
    fechaHoraCreacion: Date;
    fechaHoraExpiracion: Date;
}
