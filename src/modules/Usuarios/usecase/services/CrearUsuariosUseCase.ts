import { injectable, inject } from 'inversify';
import BadMessageException from '@common/http/exceptions/BadMessageException';
import { PerfilesRepository } from '@modules/Perfiles/domain/repositories/PerfilesRepository';
import { UsuariosRepository } from '../../domain/repositories/UsuariosRepository';
import Usuarios from '../../domain/entities/Usuarios';
import { ICrearUsuariosIn } from '../dto/in';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import { IAuthService } from '../../../services/IAuthService';

@injectable()
export default class CrearUsuariosUseCase {
    constructor(
        @inject(TYPESDEPENDENCIES.UsuariosRepository) private usuariosRepository: UsuariosRepository,
        @inject(TYPESDEPENDENCIES.PerfilesRepository) private perfilesRepository: PerfilesRepository,
        @inject(TYPESDEPENDENCIES.AuthService) private authService: IAuthService,
    ) {}

    async execute(data: ICrearUsuariosIn): Promise<void> {
        await this.validarPerfil(data.id_perfil);
        await this.validarUsuarioNoExistente(data);
        const nuevoUsuario = await this.crearNuevoUsuario(data);
        await this.usuariosRepository.guardar(nuevoUsuario);
    }

    private async validarPerfil(idPerfil?: number): Promise<void> {
        if (idPerfil) {
            const perfilExiste = await this.perfilesRepository.consultarPorId(idPerfil);
            if (!perfilExiste) {
                throw new BadMessageException('El perfil no existe', 'El perfil especificado no existe');
            }
        }
    }

    private async validarUsuarioNoExistente(data: ICrearUsuariosIn): Promise<void> {
        const usuarioExistente = await this.usuariosRepository.consultarUsuarioPorCorreo(data.correo);
        if (usuarioExistente) {
            throw new BadMessageException('El usuario ya existe', 'El correo del usuario ya fue creado');
        }

        const usuarioExistenteNombreUsuario = await this.usuariosRepository.validarNombreUsuario(data.nombre_usuario);
        if (usuarioExistenteNombreUsuario) {
            throw new BadMessageException('El usuario ya existe', 'El nombre de usuario ya fue creado');
        }
    }

    private async crearNuevoUsuario(data: ICrearUsuariosIn): Promise<Usuarios> {
        const hashContrasena = await this.authService.hashPassword(data.contrasena);
        return {
            nombreUsuario: data.nombre_usuario,
            correo: data.correo,
            hashContrasena,
            idPerfil: data.id_perfil ?? 1,
            activo: true,
        };
    }
}
