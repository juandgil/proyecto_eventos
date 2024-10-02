import { injectable, inject } from 'inversify';
import { UsuariosRepository } from '../../domain/repositories/UsuariosRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import Usuarios from '../../domain/entities/Usuarios';

@injectable()
export default class ListarUsuariosUseCase {
    constructor(@inject(TYPESDEPENDENCIES.UsuariosRepository) private usuariosRepository: UsuariosRepository) {}

    async execute(): Promise<Usuarios[]> {
        return this.usuariosRepository.listarUsuarios();
    }
}
