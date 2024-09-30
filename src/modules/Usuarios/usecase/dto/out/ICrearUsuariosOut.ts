export interface ICrearUsuariosOut {
    exists: boolean;
}
export interface ICrearUsuariosSuiteOut {
    nombres: string;
    apellidos: string;
    correo: string;
    contrasena: string;
    confirmacion_contrasena: string;
    acepta_politicas: boolean;
}
export interface IUsuariosOut {
    estado: string;
    reintentos: number;
    codigo_cliente: number;
    id_usuario?: number;
    parametros: {
        codigo_cliente: number;
        contrasena: string;
        nombres: string;
        apellidos: string;
        tipo_identificacion: string;
        identificacion: string;
        telefono?: string;
        correo: string;
    };
}
