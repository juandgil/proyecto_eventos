import Perfiles from '../entities/Perfiles';

export interface PerfilesRepository {
    crear(perfil: Perfiles): Promise<Perfiles>;
    actualizar(perfil: Perfiles): Promise<Perfiles>;
    eliminar(idPerfil: number): Promise<void>;
    consultarPorId(idPerfil: number): Promise<Perfiles | null>;
    listar(): Promise<Perfiles[]>;
}
