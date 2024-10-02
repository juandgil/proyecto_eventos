export default class Eventos {
    id_evento?: number;
    titulo: string;
    descripcion?: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    id_creador: number;
    id_ubicacion: number;
    id_categoria: number;
    creado_en?: Date;
    actualizado_en?: Date;

    constructor(data: {
        titulo: string;
        descripcion?: string;
        fecha_inicio: Date;
        fecha_fin: Date;
        id_creador: number;
        id_ubicacion: number;
        id_categoria: number;
        id_evento?: number;
        creado_en?: Date;
        actualizado_en?: Date;
    }) {
        this.id_evento = data.id_evento;
        this.titulo = data.titulo;
        this.descripcion = data.descripcion;
        this.fecha_inicio = data.fecha_inicio;
        this.fecha_fin = data.fecha_fin;
        this.id_creador = data.id_creador;
        this.id_ubicacion = data.id_ubicacion;
        this.id_categoria = data.id_categoria;
        this.creado_en = data.creado_en;
        this.actualizado_en = data.actualizado_en;
    }
}
