export interface IConsultarAsistenciaOut {
    id_asistencia: number;
    usuario: {
        id_usuario: number;
        nombre_usuario: string;
    };
    evento: {
        id_evento: number;
        titulo: string;
    };
    creado_en: Date;
}
