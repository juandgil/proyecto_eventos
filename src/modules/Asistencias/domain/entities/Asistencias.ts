export default class Asistencias {
    id_asistencia?: number;

    id_usuario: number;

    id_evento: number;

    creado_en?: Date;

    constructor(data: { id_usuario: number; id_evento: number; id_asistencia?: number; creado_en?: Date }) {
        this.id_asistencia = data.id_asistencia;
        this.id_usuario = data.id_usuario;
        this.id_evento = data.id_evento;
        this.creado_en = data.creado_en;
    }
}
