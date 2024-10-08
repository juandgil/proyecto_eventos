import { ICrearUsuariosIn } from '@modules/Usuarios/usecase/dto/in';

export default class Usuarios {
    idUsuario?: number;

    nombreUsuario: string;

    correo: string;

    hashContrasena?: string;

    idPerfil: number;

    activo: boolean;

    constructor(data: ICrearUsuariosIn) {
        this.nombreUsuario = data.nombre_usuario;
        this.correo = data.correo;
        this.hashContrasena = data.hash_contrasena;
        this.idPerfil = data.id_perfil ?? 1;
        this.idUsuario = data.id_usuario;
        this.activo = data.activo ?? true; // Por defecto, un usuario nuevo está activo
    }
}
