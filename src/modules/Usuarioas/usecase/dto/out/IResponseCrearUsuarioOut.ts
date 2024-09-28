import Usuarios from '@modules/Usuarioas/domain/entities/Usuarios';

export default class IResponseCrearUsuarioOut {
    correo: string;

    activo: boolean;

    sincronizacion_suite: boolean;

    estado_sincronizacion: string | null;

    id_perfil?: number | null;

    constructor(usuario: Usuarios) {
        this.correo = usuario.correo;
        this.activo = usuario.activo ?? false;
        this.sincronizacion_suite = usuario.sincronizacionSuite ?? false;
        this.estado_sincronizacion = usuario.estadoSincronizacion ?? null;
        this.id_perfil = usuario.idPerfil ?? null;
    }
}
