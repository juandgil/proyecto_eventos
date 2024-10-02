export default class Ubicaciones {
    id_ubicacion?: number;

    nombre: string;

    direccion: string;

    latitud: number;

    longitud: number;

    creado_en?: Date;

    actualizado_en?: Date;

    constructor(data: {
        nombre: string;
        direccion: string;
        latitud: number;
        longitud: number;
        id_ubicacion?: number;
        creado_en?: Date;
        actualizado_en?: Date;
    }) {
        this.id_ubicacion = data.id_ubicacion;
        this.nombre = data.nombre;
        this.direccion = data.direccion;
        this.latitud = data.latitud;
        this.longitud = data.longitud;
        this.creado_en = data.creado_en;
        this.actualizado_en = data.actualizado_en;
    }
}
