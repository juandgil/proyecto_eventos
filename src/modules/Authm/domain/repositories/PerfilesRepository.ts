import { IConstultarPerfilesOut } from '@modules/Perfiles/usecase/dto/out';
import Perfiles from '../entities/Perfiles';

export interface PerfilesRepository {
    consultarPorId(idPerfil: number): Promise<IConstultarPerfilesOut>;
    consultarMaestro(): Promise<Perfiles | null>;
}
