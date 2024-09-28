import { TokenUsuario } from '@modules/Usuarioas/usecase/dto/in/INotificacionesUsuariosSuiteIn';

export default class TokenUsuarios {
    idTokenUsuario?: number;

    valor: string;

    activo: boolean;

    idUsuario: number | undefined;

    fechaHoraExpiracion: Date;

    fechaHoraCreacion: Date;

    constructor(tokenUsuario: TokenUsuario) {
        this.idTokenUsuario = tokenUsuario.id_token_usuario;
        this.valor = tokenUsuario.valor;
        this.activo = tokenUsuario.activo;
        this.idUsuario = tokenUsuario.id_usuario;
        this.fechaHoraExpiracion = tokenUsuario.fecha_hora_expiracion;
        this.fechaHoraCreacion = tokenUsuario.fecha_hora_creacion;
    }
}
