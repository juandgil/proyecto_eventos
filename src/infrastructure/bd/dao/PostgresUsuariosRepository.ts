import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import TYPESDEPENDENCIES from '@common/dependencies/TypesDependencies';
import PostgresException from '@common/http/exceptions/PostgresException';
import { logger } from '@common/logger';
import Usuarios from '@modules/Usuarioas/domain/entities/Usuarios';
import { UsuariosRepository } from '@modules/Usuarioas/domain/repositories/UsuariosRepository';
import { IConstultarUsuariosOut } from '@modules/Usuarioas/usecase/dto/out/IConstultarUsuariosOut';
import { injectable } from 'inversify';
import { IDatabase, IMain } from 'pg-promise';
import { TokenUsuario } from '@modules/Usuarioas/usecase/dto/in/INotificacionesUsuariosSuiteIn';
import TokenUsuarios from '@modules/Usuarioas/domain/entities/TokenUsuarios';

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
            VALUES ($/nombre_usuario/, $/correo/, $/hash_contrasena/, $/id_perfil/)`;
            await this.db.query(sqlQuery, {
                nombre_usuario: data.nombreUsuario,
                correo: data.correo,
                hash_contrasena: data.hashContrasena,
                id_perfil: data.idPerfil,
            });
        } catch (error) {
            logger.error('USUARIOS', 'guardar', [`Error creando usuario: ${error}`]);
            throw new PostgresException(500, `Error en insercion de postgres guardar: ${error.message}`);
        }
    }

    async consultarUsuarioPorCorreo(correo: string): Promise<Usuarios | null> {
        try {
            const sqlQuery = `SELECT * FROM usuarios WHERE correo = $/correo/ LIMIT 1`;
            const usuario = await this.db.oneOrNone(sqlQuery, { correo });
            return usuario ? new Usuarios(usuario) : null;
        } catch (error) {
            logger.error('USUARIOS', 'consultarUsuarioPorCorreo', [`Error consultando el usuario: ${error}`]);
            throw new PostgresException(500, `Error al consultar el usuario de postgres: ${error.message}`);
        }
    }

    async actualizarEstadoSincronizacion(correo: string, estado: string): Promise<void> {
        try {
            const sqlQuery = `UPDATE usuarios SET estado_sincronizacion = $/estado/ WHERE correo = $/correo/`;
            await this.db.none(sqlQuery, { correo, estado });
        } catch (error) {
            logger.error('USUARIOS', 'actualizarEstadoSincronizacion', [
                `Error actualizando el estado de sincronizacion: ${error}`,
            ]);
            throw new PostgresException(
                500,
                `Error al actualizar el estado de sincronizacion de postgres: ${error.message}`,
            );
        }
    }

    async crearTokenUsuario(crearTokenUsuario: TokenUsuarios): Promise<TokenUsuario> {
        try {
            const sqlQuery = `
            INSERT INTO ${this.schema}.token_usuarios (valor, activo, id_usuario, fecha_hora_expiracion, fecha_hora_creacion)
            VALUES ($/valor/, $/activo/, $/idUsuario/, $/fechaHoraExpiracion/, $/fechaHoraCreacion/) RETURNING *`;
            const usuario = await this.db.oneOrNone(sqlQuery, crearTokenUsuario);
            return usuario;
        } catch (error) {
            logger.error('USUARIOS', 'crearTokenUsuario', [`Error creando token: ${error}`]);
            throw new PostgresException(500, `Error en insercion de postgres crearTokenUsuario: ${error.message}`);
        }
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

    async consultarUsuarioPorIdUsuario(idUsuario: number): Promise<IConstultarUsuariosOut> {
        try {
            const sqlQuery = `SELECT * FROM usuarios WHERE id_usuario = $/idUsuario/ LIMIT 1`;
            const usuario = await this.db.oneOrNone(sqlQuery, { idUsuario });
            return usuario;
        } catch (error) {
            logger.error('USUARIOS', 'consultarUsuarioPorIdUsuario', [`Error consultando el usuario: ${error}`]);
            throw new PostgresException(500, `Error al consultar el usuario de postgres: ${error.message}`);
        }
    }

    async actualizarSincronizacionSuite(correo: string, sincronizado: boolean): Promise<void> {
        try {
            const sqlQuery = `UPDATE usuarios SET sincronizacion_suite = $/sincronizado/ WHERE correo = $/correo/`;
            await this.db.none(sqlQuery, {
                sincronizado,
                correo,
            });
        } catch (error) {
            logger.error('USUARIOS', 'actualizarSincronizacionSuite', [
                `Error actualizando sincronizacion suite: ${error.message}`,
            ]);
            throw new PostgresException(500, `Error actualizando sincronizacion suite: ${error.message}`);
        }
    }
}
