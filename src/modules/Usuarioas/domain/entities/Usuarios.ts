import { ICrearUsuariosIn } from '@modules/Usuarioas/usecase/dto/in';

export default class Usuarios {
    correo: string;

    activo: boolean;

    sincronizacionSuite: boolean;

    estadoSincronizacion: string | null;

    idPerfil?: number | null;

    idUsuario?: number;

    constructor(usuario: ICrearUsuariosIn) {
        this.correo = usuario.correo;
        this.activo = usuario.activo ?? false;
        this.sincronizacionSuite = usuario.sincronizacion_suite ?? false;
        this.estadoSincronizacion = usuario.estado_sincronizacion ?? null;
        this.idPerfil = usuario.id_perfil ?? null;
        this.idUsuario = usuario.id_usuario;
    }
}
