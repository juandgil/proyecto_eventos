import Asistencias from '../entities/Asistencias';
import { IListarAsistenciasIn } from '../../usecase/dto/in/IAsistenciasIn';

export interface AsistenciasRepository {
    crear(asistencia: Asistencias): Promise<Asistencias>;
    eliminar(id: number): Promise<void>;
    consultar(id: number): Promise<Asistencias | null>;
    listar(filtros: IListarAsistenciasIn): Promise<Asistencias[]>;
    buscarPorUsuarioYEvento(idUsuario: number, idEvento: number): Promise<Asistencias | null>;
    contarAsistencias(filtros: Omit<IListarAsistenciasIn, 'page' | 'limit'>): Promise<number>;
    existeUsuario(idUsuario: number): Promise<boolean>;
    existeEvento(idEvento: number): Promise<boolean>;
    obtenerUsuario(idUsuario: number): Promise<{ id_usuario: number; nombre_usuario: string }>;
    obtenerEvento(idEvento: number): Promise<{ id_evento: number; titulo: string }>;
}
