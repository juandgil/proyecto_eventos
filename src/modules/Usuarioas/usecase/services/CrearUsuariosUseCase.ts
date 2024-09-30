import { injectable, inject } from 'inversify';
import BadMessageException from '@common/http/exceptions/BadMessageException';
import bcrypt from 'bcrypt';
import { UsuariosRepository } from '../../domain/repositories/UsuariosRepository';
import Usuarios from '../../domain/entities/Usuarios';
import { ICrearUsuariosIn } from '../dto/in';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';

/**
 * @description: Crear un nuevo usuario
 * @param {ICrearUsuariosIn} data
 * @returns {Promise<Usuarios>}
 */
@injectable()
export default class CrearUsuariosUseCase {
    // private usuariosRepository = DEPENDENCY_CONTAINER.get<UsuariosRepository>(TYPESDEPENDENCIES.UsuariosRepository);
    constructor(@inject(TYPESDEPENDENCIES.UsuariosRepository) private usuariosRepository: UsuariosRepository) {}

    async execute(data: ICrearUsuariosIn): Promise<void> {
        const usuarioExistente = await this.usuariosRepository.consultarUsuarioPorCorreo(data.correo);
        if (usuarioExistente) {
            throw new BadMessageException('El usuario ya existe', 'El correo del usuario ya fue creado');
        }

        // Hashear la contraseña
        const saltRounds = 10;
        const hashContrasena = await bcrypt.hash(data.contrasena, saltRounds);

        const nuevoUsuario = new Usuarios({
            nombre_usuario: data.nombre_usuario,
            correo: data.correo,
            contrasena: data.contrasena,
            hash_contrasena: hashContrasena,
            perfil_id: data.perfil_id,
        });

        await this.usuariosRepository.guardar(nuevoUsuario);
    }
}
