import { injectable, inject } from 'inversify';
import BadMessageException from '@common/http/exceptions/BadMessageException';
import Usuarios from '@modules/Usuarios/domain/entities/Usuarios';
import { UsuariosRepository } from '../../domain/repositories/UsuariosRepository';
import { ILoginUsuariosIn } from '../dto/in';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import { IAuthService } from '../../../services/IAuthService';

@injectable()
export default class GenerarTokenUseCase {
    constructor(
        @inject(TYPESDEPENDENCIES.UsuariosRepository) private usuariosRepository: UsuariosRepository,
        @inject(TYPESDEPENDENCIES.AuthService) private authService: IAuthService,
    ) {}

    async execute(data: ILoginUsuariosIn): Promise<string> {
        const usuario: Usuarios | null = await this.obtenerUsuarioPorCorreo(data.correo);
        if (!usuario?.idUsuario) {
            throw new BadMessageException('Usuario no encontrado', 'Usuario no encontrado');
        }
        await this.validarUsuario(usuario, data.contrasena);
        return this.generarToken(usuario.idUsuario.toString());
    }

    private async obtenerUsuarioPorCorreo(correo: string): Promise<Usuarios | null> {
        return this.usuariosRepository.consultarUsuarioPorCorreo(correo);
    }

    private async validarUsuario(usuario: Usuarios, contrasena: string): Promise<void> {
        if (
            !usuario.hashContrasena ||
            !(await this.authService.compararContrasenas(contrasena, usuario.hashContrasena))
        ) {
            throw new BadMessageException('Credenciales inválidas', 'Credenciales inválidas');
        }
    }

    private generarToken(usuarioId: string): string {
        return this.authService.generarToken(usuarioId);
    }
}
