import { ICrearUsuariosIn } from '@modules/Usuarioas/usecase/dto/in';

export default class Usuarios {
    id?: number;

    nombreUsuario: string;

    correo: string;

    hashContrasena?: string;

    perfilId: number;

    constructor(data: ICrearUsuariosIn) {
        this.nombreUsuario = data.nombre_usuario;
        this.correo = data.correo;
        this.hashContrasena = data.hash_contrasena;
        this.perfilId = data.perfil_id;
        this.id = data.id;
    }
}
