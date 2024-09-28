import { IUsuariosOut } from '../../usecase/dto/out/ICrearUsuariosOut';

export default class NotificacionUsuarioCreado {
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
        telefono?: string | null;
        correo: string;
    };

    constructor(usuario: IUsuariosOut) {
        this.estado = usuario.estado;
        this.reintentos = usuario.reintentos;
        this.codigo_cliente = usuario.codigo_cliente;
        this.id_usuario = usuario.id_usuario;
        this.parametros = {
            codigo_cliente: usuario.parametros.codigo_cliente,
            contrasena: usuario.parametros.contrasena,
            nombres: usuario.parametros.nombres,
            apellidos: usuario.parametros.apellidos,
            tipo_identificacion: usuario.parametros.tipo_identificacion,
            identificacion: usuario.parametros.identificacion,
            telefono: usuario.parametros.telefono ?? null,
            correo: usuario.parametros.correo,
        };
    }
}
