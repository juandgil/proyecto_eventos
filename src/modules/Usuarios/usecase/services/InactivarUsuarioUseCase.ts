import { injectable, inject } from 'inversify';
import BadMessageException from '@common/http/exceptions/BadMessageException';
import { UsuariosRepository } from '../../domain/repositories/UsuariosRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';

@injectable()
export default class InactivarUsuarioUseCase {
    constructor(@inject(TYPESDEPENDENCIES.UsuariosRepository) private usuariosRepository: UsuariosRepository) {}

    async execute(idUsuario: number): Promise<void> {
        const usuario = await this.usuariosRepository.consultarUsuarioPorIdUsuario(idUsuario);
        if (!usuario) {
            throw new BadMessageException('Usuario no encontrado', 'El usuario especificado no existe');
        }

        if (!usuario.activo) {
            throw new BadMessageException('Usuario ya inactivo', 'El usuario ya se encuentra inactivo');
        }

        await this.usuariosRepository.inactivarUsuario(idUsuario);
    }
}
