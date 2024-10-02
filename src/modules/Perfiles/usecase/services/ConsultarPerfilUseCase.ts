import { injectable, inject } from 'inversify';
import NotFoundException from '@common/http/exceptions/NotFoundException';
import { PerfilesRepository } from '../../domain/repositories/PerfilesRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import Perfiles from '../../domain/entities/Perfiles';

@injectable()
export default class ConsultarPerfilUseCase {
    constructor(@inject(TYPESDEPENDENCIES.PerfilesRepository) private perfilesRepository: PerfilesRepository) {}

    async execute(idPerfil: number): Promise<Perfiles> {
        const perfil = await this.perfilesRepository.consultarPorId(idPerfil);
        if (!perfil) {
            throw new NotFoundException('Perfil no encontrado', `No se encontró el perfil con ID ${idPerfil}`);
        }
        return perfil;
    }
}
