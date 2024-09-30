import { IConstultarUsuariosOut } from '@modules/Usuarioas/usecase/dto/out/IConstultarUsuariosOut';
import { TokenUsuario } from '@modules/Usuarioas/usecase/dto/in/INotificacionesUsuariosSuiteIn';
import Usuarios from '../entities/Usuarios';
import TokenUsuarios from '../entities/TokenUsuarios';

export interface UsuariosRepository {
    guardar(usuarios: Usuarios): Promise<void>;
    consultarUsuarioPorCorreo(correoUsuario: string): Promise<Usuarios | null>;
    actualizarEstadoSincronizacion(correoUsuario: string, estado: string): Promise<void>;
    crearTokenUsuario(crearTokenUsuario: TokenUsuarios): Promise<TokenUsuario>;
    consultarUsuarioPorIdUsuario(idUsuario: number): Promise<IConstultarUsuariosOut>;
    asociarPerfil(perfil: number, idUsuario: number): Promise<IConstultarUsuariosOut>;
    actualizarSincronizacionSuite(correo: string, sincronizado: boolean): Promise<void>;
}
