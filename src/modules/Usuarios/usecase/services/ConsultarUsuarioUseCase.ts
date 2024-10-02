import { injectable, inject } from 'inversify';
import BadMessageException from '@common/http/exceptions/BadMessageException';
import { UsuariosRepository } from '../../domain/repositories/UsuariosRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import Usuarios from '../../domain/entities/Usuarios';

@injectable()
export default class ConsultarUsuarioUseCase {
    constructor(@inject(TYPESDEPENDENCIES.UsuariosRepository) private usuariosRepository: UsuariosRepository) {}

    async execute(idUsuario: number): Promise<Usuarios> {
        const usuario = await this.usuariosRepository.consultarUsuarioPorIdUsuario(idUsuario);
        if (!usuario) {
            throw new BadMessageException('Usuario no encontrado', 'El usuario especificado no existe');
        }
        return usuario;
    }
}
