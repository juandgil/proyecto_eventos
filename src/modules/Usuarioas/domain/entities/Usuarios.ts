import { ICrearUsuariosIn } from '@modules/Usuarioas/usecase/dto/in';

export default class Usuarios {
    id_usuario?: number;

    nombreUsuario: string;

    correo: string;

    hashContrasena?: string;

    idPerfil: number;

    constructor(data: ICrearUsuariosIn) {
        this.nombreUsuario = data.nombre_usuario;
        this.correo = data.correo;
        this.hashContrasena = data.hash_contrasena;
        this.idPerfil = data.id_perfil;
        this.id_usuario = data.id_usuario;
    }
}
