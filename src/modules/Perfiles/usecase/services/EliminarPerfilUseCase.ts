import { injectable, inject } from 'inversify';
import NotFoundException from '@common/http/exceptions/NotFoundException';
import { PerfilesRepository } from '../../domain/repositories/PerfilesRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';

@injectable()
export default class EliminarPerfilUseCase {
    constructor(@inject(TYPESDEPENDENCIES.PerfilesRepository) private perfilesRepository: PerfilesRepository) {}

    async execute(idPerfil: number): Promise<void> {
        const perfilExistente = await this.perfilesRepository.consultarPorId(idPerfil);
        if (!perfilExistente) {
            throw new NotFoundException('Perfil no encontrado', `No se encontró el perfil con ID ${idPerfil}`);
        }
        await this.perfilesRepository.eliminar(idPerfil);
    }
}
