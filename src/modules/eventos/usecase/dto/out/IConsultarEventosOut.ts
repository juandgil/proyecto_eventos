export interface IConsultarEventoOut {
    id_evento: number;
    titulo: string;
    descripcion?: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    creador: {
        id_usuario: number;
        nombre_usuario: string;
    };
    ubicacion: {
        id_ubicacion: number;
        nombre: string;
        direccion: string;
    };
    categoria: {
        id_categoria: number;
        nombre: string;
    };
    creado_en: Date;
    actualizado_en: Date;
}
