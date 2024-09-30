import { injectable, inject } from 'inversify';
import BadMessageException from '@common/http/exceptions/BadMessageException';
import Usuarios from '@modules/Usuarios/domain/entities/Usuarios';
import { UsuariosRepository } from '../../domain/repositories/UsuariosRepository';
import { ILoginUsuariosIn } from '../dto/in';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import AuthService from '../../../services/AuthService';

@injectable()
export default class GenerarTokenUseCase {
    constructor(@inject(TYPESDEPENDENCIES.UsuariosRepository) private usuariosRepository: UsuariosRepository) {}

    async execute(data: ILoginUsuariosIn): Promise<string> {
        const usuario: Usuarios | null = await this.obtenerUsuarioPorCorreo(data.correo);
        if (!usuario?.idUsuario) {
            throw new BadMessageException('Usuario no encontrado', 'Usuario no encontrado');
        }
        await this.validarUsuario(usuario, data.contrasena);
        return this.generarToken(usuario.idUsuario.toString());
    }

    private async obtenerUsuarioPorCorreo(correo: string): Promise<Usuarios | null> {
        const usuario: Usuarios | null = await this.usuariosRepository.consultarUsuarioPorCorreo(correo);
        return usuario;
    }

    private async validarUsuario(usuario: Usuarios, contrasena: string): Promise<void> {
        if (!usuario.hashContrasena || !(await AuthService.compararContrasenas(contrasena, usuario.hashContrasena))) {
            throw new BadMessageException('Credenciales inválidas', 'Credenciales inválidas');
        }
    }

    private generarToken(usuarioId: string): string {
        return AuthService.generarToken(usuarioId);
    }
}
