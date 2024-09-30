import { IConstultarPerfilesOut } from '@modules/Perfiles/usecase/dto/out';

export default class Perfiles {
    idPerfil: number;

    esMaestro: boolean;

    nombre: string;

    constructor(perfil: IConstultarPerfilesOut) {
        this.idPerfil = perfil.id_perfil;
        this.esMaestro = perfil.es_maestro;
        this.nombre = perfil.nombre;
    }
}
