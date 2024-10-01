import { injectable, inject } from 'inversify';
import BadMessageException from '@common/http/exceptions/BadMessageException';
import { PerfilesRepository } from '@modules/Perfiles/domain/repositories/PerfilesRepository';
import { UsuariosRepository } from '../../domain/repositories/UsuariosRepository';
import Usuarios from '../../domain/entities/Usuarios';
import { ICrearUsuariosIn } from '../dto/in';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import AuthService from '../../../services/AuthService';
/**
 * @description: Crear un nuevo usuario
 * @param {ICrearUsuariosIn} data
 * @returns {Promise<Usuarios>}
 */
@injectable()
export default class CrearUsuariosUseCase {
    constructor(
        @inject(TYPESDEPENDENCIES.UsuariosRepository) private usuariosRepository: UsuariosRepository,
        @inject(TYPESDEPENDENCIES.PerfilesRepository) private perfilesRepository: PerfilesRepository,
    ) {}

    async execute(data: ICrearUsuariosIn): Promise<void> {
        if (data.id_perfil) {
            const perfilExiste = await this.perfilesRepository.consultarPorId(data.id_perfil);
            if (!perfilExiste) {
                throw new BadMessageException('El perfil no existe', 'El perfil especificado no existe');
            }
        }

        const usuarioExistente = await this.usuariosRepository.consultarUsuarioPorCorreo(data.correo);
        if (usuarioExistente) {
            throw new BadMessageException('El usuario ya existe', 'El correo del usuario ya fue creado');
        }

        const usuarioExistenteNombreUsuario = await this.usuariosRepository.validarNombreUsuario(data.nombre_usuario);
        if (usuarioExistenteNombreUsuario) {
            throw new BadMessageException('El usuario ya existe', 'El nombre de usuario ya fue creado');
        }

        // Hashear la contraseña
        const hashContrasena = await AuthService.hashPassword(data.contrasena);

        const nuevoUsuario: Usuarios = {
            nombreUsuario: data.nombre_usuario,
            correo: data.correo,
            hashContrasena,
            idPerfil: data.id_perfil ?? 1,
        };

        await this.usuariosRepository.guardar(nuevoUsuario);
    }
}
