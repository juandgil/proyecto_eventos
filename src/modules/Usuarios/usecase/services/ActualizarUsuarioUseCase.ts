import { injectable, inject } from 'inversify';
import BadMessageException from '@common/http/exceptions/BadMessageException';
import { PerfilesRepository } from '@modules/Perfiles/domain/repositories/PerfilesRepository';
import { UsuariosRepository } from '../../domain/repositories/UsuariosRepository';
import { IActualizarUsuarioIn } from '../dto/in';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import { IAuthService } from '../../../services/IAuthService';

@injectable()
export default class ActualizarUsuarioUseCase {
    constructor(
        @inject(TYPESDEPENDENCIES.UsuariosRepository) private usuariosRepository: UsuariosRepository,
        @inject(TYPESDEPENDENCIES.AuthService) private authService: IAuthService,
        @inject(TYPESDEPENDENCIES.PerfilesRepository) private perfilesRepository: PerfilesRepository,
    ) {}

    async execute(data: IActualizarUsuarioIn): Promise<void> {
        const usuarioExistente = await this.usuariosRepository.consultarUsuarioPorIdUsuario(data.id_usuario);
        if (!usuarioExistente) {
            throw new BadMessageException('Usuario no encontrado', 'El usuario especificado no existe');
        }

        if (data.correo && data.correo !== usuarioExistente.correo) {
            const usuarioConNuevoCorreo = await this.usuariosRepository.consultarUsuarioPorCorreo(data.correo);
            if (usuarioConNuevoCorreo && usuarioConNuevoCorreo.idUsuario !== data.id_usuario) {
                throw new BadMessageException('Correo duplicado', 'El nuevo correo ya está en uso');
            }
        }

        if (data.nombre_usuario && data.nombre_usuario !== usuarioExistente.nombreUsuario) {
            const usuarioConNuevoNombre = await this.usuariosRepository.validarNombreUsuario(data.nombre_usuario);
            if (usuarioConNuevoNombre && usuarioConNuevoNombre.idUsuario !== data.id_usuario) {
                throw new BadMessageException(
                    'Nombre de usuario duplicado',
                    'El nuevo nombre de usuario ya está en uso',
                );
            }
        }

        if (data.id_perfil && data.id_perfil !== usuarioExistente.idPerfil) {
            const perfilExistente = await this.perfilesRepository.consultarPorId(data.id_perfil);
            if (!perfilExistente) {
                throw new BadMessageException('Perfil no encontrado', 'El perfil especificado no existe');
            }
        }

        let { hashContrasena } = usuarioExistente;
        if (data.contrasena) {
            hashContrasena = await this.authService.hashPassword(data.contrasena);
        }

        const usuarioActualizado = {
            idUsuario: data.id_usuario,
            nombreUsuario: data.nombre_usuario || usuarioExistente.nombreUsuario,
            correo: data.correo || usuarioExistente.correo,
            hashContrasena,
            idPerfil: data.id_perfil || usuarioExistente.idPerfil,
            activo: true,
        };

        await this.usuariosRepository.actualizarUsuario(usuarioActualizado);
    }
}
