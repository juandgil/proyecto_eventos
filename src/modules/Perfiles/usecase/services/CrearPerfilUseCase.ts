import { injectable, inject } from 'inversify';
import { PerfilesRepository } from '../../domain/repositories/PerfilesRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import Perfiles from '../../domain/entities/Perfiles';
import { ICrearPerfilIn } from '../dto/in/IPerfilesIn';

@injectable()
export default class CrearPerfilUseCase {
    constructor(@inject(TYPESDEPENDENCIES.PerfilesRepository) private perfilesRepository: PerfilesRepository) {}

    async execute(data: ICrearPerfilIn): Promise<Perfiles> {
        const perfil = new Perfiles(data);
        return this.perfilesRepository.crear(perfil);
    }
}
