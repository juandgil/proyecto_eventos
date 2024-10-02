import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import TYPESDEPENDENCIES from '@common/dependencies/TypesDependencies';
import PostgresException from '@common/http/exceptions/PostgresException';
import { logger } from '@common/logger';
import Usuarios from '@modules/Usuarios/domain/entities/Usuarios';
import { UsuariosRepository } from '@modules/Usuarios/domain/repositories/UsuariosRepository';
import { IConstultarUsuariosOut } from '@modules/Usuarios/usecase/dto/out/IConstultarUsuariosOut';
import { injectable } from 'inversify';
import { IDatabase, IMain } from 'pg-promise';

@injectable()
export default class PostgresUsuariosRepository implements UsuariosRepository {
    get db(): IDatabase<IMain> {
        return DEPENDENCY_CONTAINER.get<IDatabase<IMain>>(TYPESDEPENDENCIES.db);
    }

    schema = '"public"';

    async guardar(data: Usuarios): Promise<void> {
        try {
            const sqlQuery = `
            INSERT INTO Usuarios (nombre_usuario, correo, hash_contrasena, id_perfil)
            VALUES ($/nombreUsuario/, $/correo/, $/hashContrasena/, $/idPerfil/)`;
            await this.db.query(sqlQuery, {
                nombreUsuario: data.nombreUsuario,
                correo: data.correo,
                hashContrasena: data.hashContrasena,
                idPerfil: data.idPerfil,
            });
        } catch (error) {
            logger.error('USUARIOS', 'guardar', [`Error creando usuario: ${error}`]);
            throw new PostgresException(500, `Error en insercion de postgres guardar: ${error.message}`);
        }
    }

    async consultarUsuarioPorCorreo(correo: string): Promise<Usuarios | null> {
        const result = await this.db.oneOrNone('SELECT * FROM usuarios WHERE correo = $1', [correo]);
        logger.info('USUARIOS', 'consultarUsuarioPorCorreo', [`Resultado: ${JSON.stringify(result)}`]);
        return result ? new Usuarios(result) : null;
    }

    async validarNombreUsuario(nombreUsuario: string): Promise<Usuarios | null> {
        const result = await this.db.oneOrNone('SELECT * FROM usuarios WHERE nombre_usuario = $1', [nombreUsuario]);
        logger.info('USUARIOS', 'validarNombreUsuario', [`Resultado: ${JSON.stringify(result)}`]);
        return result ? new Usuarios(result) : null;
    }

    async asociarPerfil(perfil: number, idUsuario: number): Promise<IConstultarUsuariosOut> {
        try {
            const sqlQuery = `UPDATE usuarios SET id_perfil = $/perfil/ WHERE id_usuario = $/idUsuario/`;
            const usuario = await this.db.query(sqlQuery, {
                perfil,
                idUsuario,
            });
            return usuario;
        } catch (error) {
            logger.error('USUARIOS', 'asociarPerfil', [`Error actualizando perfil: ${error}`]);
            throw new PostgresException(500, `Error actualizando perfil: ${error.message}`);
        }
    }

    async consultarUsuarioPorIdUsuario(idUsuario: number): Promise<Usuarios | null> {
        try {
            const sqlQuery = `SELECT * FROM usuarios WHERE id_usuario = $/idUsuario/ LIMIT 1`;
            const usuario = await this.db.oneOrNone(sqlQuery, { idUsuario });
            return usuario ? new Usuarios(usuario) : null;
        } catch (error) {
            logger.error('USUARIOS', 'consultarUsuarioPorIdUsuario', [`Error consultando el usuario: ${error}`]);
            throw new PostgresException(500, `Error al consultar el usuario de postgres: ${error.message}`);
        }
    }

    async actualizarUsuario(usuario: Usuarios): Promise<number> {
        try {
            const sqlQuery = `UPDATE usuarios SET nombre_usuario = $/nombreUsuario/, correo = $/correo/, hash_contrasena = $/hashContrasena/, id_perfil = $/idPerfil/ WHERE id_usuario = $/idUsuario/ RETURNING id_usuario`;
            const idUsuario = await this.db.oneOrNone(sqlQuery, usuario);
            return idUsuario.id_usuario;
        } catch (error) {
            logger.error('USUARIOS', 'actualizarUsuario', [`Error actualizando el usuario: ${error}`]);
            throw new PostgresException(500, `Error actualizando el usuario: ${error.message}`);
        }
    }

    async eliminarUsuario(idUsuario: number): Promise<void> {
        try {
            const sqlQuery = `DELETE FROM usuarios WHERE id_usuario = $/idUsuario/`;
            await this.db.none(sqlQuery, { idUsuario });
        } catch (error) {
            logger.error('USUARIOS', 'eliminarUsuario', [`Error eliminando el usuario: ${error}`]);
            throw new PostgresException(500, `Error eliminando el usuario: ${error.message}`);
        }
    }

    async inactivarUsuario(idUsuario: number): Promise<void> {
        try {
            const sqlQuery = `UPDATE usuarios SET activo = false WHERE id_usuario = $/idUsuario/`;
            await this.db.none(sqlQuery, { idUsuario });
        } catch (error) {
            logger.error('USUARIOS', 'inactivarUsuario', [`Error inactivando el usuario: ${error}`]);
            throw new PostgresException(500, `Error inactivando el usuario: ${error.message}`);
        }
    }

    async listarUsuarios(): Promise<Usuarios[]> {
        try {
            const sqlQuery = `SELECT * FROM usuarios`;
            const usuarios = await this.db.manyOrNone(sqlQuery);
            return usuarios.map((usuario) => new Usuarios(usuario));
        } catch (error) {
            logger.error('USUARIOS', 'listarUsuarios', [`Error listando usuarios: ${error}`]);
            throw new PostgresException(500, `Error listando usuarios: ${error.message}`);
        }
    }
}
