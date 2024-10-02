import { injectable, inject } from 'inversify';
import { PerfilesRepository } from '../../domain/repositories/PerfilesRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import Perfiles from '../../domain/entities/Perfiles';

@injectable()
export default class ListarPerfilesUseCase {
    constructor(@inject(TYPESDEPENDENCIES.PerfilesRepository) private perfilesRepository: PerfilesRepository) {}

    async execute(): Promise<Perfiles[]> {
        return this.perfilesRepository.listar();
    }
}
