import { IConstultarUsuariosOut } from '@modules/Usuarios/usecase/dto/out/IConstultarUsuariosOut';
import Usuarios from '../entities/Usuarios';

export interface UsuariosRepository {
    guardar(usuarios: Usuarios): Promise<void>;
    consultarUsuarioPorCorreo(correoUsuario: string): Promise<Usuarios | null>;
    validarNombreUsuario(nombreUsuario: string): Promise<Usuarios | null>;
    consultarUsuarioPorIdUsuario(idUsuario: number): Promise<IConstultarUsuariosOut>;
    asociarPerfil(perfil: number, idUsuario: number): Promise<IConstultarUsuariosOut>;
    eliminarUsuario(idUsuario: number): Promise<void>;
    actualizarUsuario(usuario: Usuarios): Promise<number>;
}
