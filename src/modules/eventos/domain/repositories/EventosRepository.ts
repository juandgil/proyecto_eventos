import Eventos from '../entities/Eventos';
import { IListarEventosIn } from '../../usecase/dto/in/IEventosIn';

export interface EventosRepository {
    crear(evento: Eventos): Promise<Eventos>;
    actualizar(id: number, evento: Eventos): Promise<Eventos>;
    eliminar(id: number): Promise<void>;
    consultar(id: number): Promise<Eventos | null>;
    listar(filtros: IListarEventosIn): Promise<Eventos[]>;
    buscarPorTitulo(titulo: string): Promise<Eventos[]>;
    contarEventos(filtros: Omit<IListarEventosIn, 'page' | 'limit'>): Promise<number>;
    existeCreador(idCreador: number): Promise<boolean>;
    existeUbicacion(idUbicacion: number): Promise<boolean>;
    existeCategoria(idCategoria: number): Promise<boolean>;
    tieneAsistentes(idEvento: number): Promise<boolean>;
    obtenerCreador(idCreador: number): Promise<{ id_usuario: number; nombre_usuario: string }>;
    obtenerUbicacion(idUbicacion: number): Promise<{ id_ubicacion: number; nombre: string; direccion: string }>;
    obtenerCategoria(idCategoria: number): Promise<{ id_categoria: number; nombre: string }>;
}
