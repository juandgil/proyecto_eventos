export default class Perfiles {
    idPerfil?: number;

    nombre: string;

    descripcion: string;

    creadoEn?: Date;

    actualizadoEn?: Date;

    constructor(data: {
        id_perfil?: number;
        nombre: string;
        descripcion: string;
        creado_en?: Date;
        actualizado_en?: Date;
    }) {
        this.idPerfil = data.id_perfil;
        this.nombre = data.nombre;
        this.descripcion = data.descripcion;
        this.creadoEn = data.creado_en;
        this.actualizadoEn = data.actualizado_en;
    }
}
