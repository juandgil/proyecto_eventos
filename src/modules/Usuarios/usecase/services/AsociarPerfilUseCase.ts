import { UsuariosRepository } from '@modules/Usuarios/domain/repositories/UsuariosRepository';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import TYPESDEPENDENCIES from '@modules/Usuarios/dependencies/TypesDependencies';
import BadMessageException from '@common/http/exceptions/BadMessageException';
import { PerfilesRepository } from '@modules/Perfiles/domain/repositories/PerfilesRepository';
import { IAsociarPerfilIn } from '../dto/in/IAsociarPerfilIn';

export default class AsociarPerfilUseCase {
    private usuariosRepository = DEPENDENCY_CONTAINER.get<UsuariosRepository>(TYPESDEPENDENCIES.UsuariosRepository);

    private perfilesRepository = DEPENDENCY_CONTAINER.get<PerfilesRepository>(TYPESDEPENDENCIES.PerfilesRepository);

    async execute(data: IAsociarPerfilIn): Promise<void> {
        const consultarUsuario = await this.usuariosRepository.consultarUsuarioPorIdUsuario(data.id_usuario);
        if (!consultarUsuario) {
            throw new BadMessageException('Usuario no existe', 'El usuario no se encuentra registrado');
        }

        const consultarPerfil = await this.perfilesRepository.consultarPorId(data.id_perfil);

        if (!consultarPerfil) {
            throw new BadMessageException('Perfil no existe', 'El perfil especificado no existe');
        }

        await this.usuariosRepository.asociarPerfil(data.id_perfil, data.id_usuario);
    }
}
