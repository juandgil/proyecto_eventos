import { injectable, inject } from 'inversify';
import { PerfilesRepository } from '../../domain/repositories/PerfilesRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import Perfiles from '../../domain/entities/Perfiles';
import { IActualizarPerfilIn } from '../dto/in/IPerfilesIn';

@injectable()
export default class ActualizarPerfilUseCase {
    constructor(@inject(TYPESDEPENDENCIES.PerfilesRepository) private perfilesRepository: PerfilesRepository) {}

    async execute(data: IActualizarPerfilIn): Promise<Perfiles> {
        return this.perfilesRepository.actualizar(new Perfiles(data));
    }
}
