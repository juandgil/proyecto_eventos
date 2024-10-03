import { injectable, inject } from 'inversify';
import { IDatabase } from 'pg-promise';
import { AsistenciasRepository } from '@modules/Asistencias/domain/repositories/AsistenciasRepository';
import Asistencias from '@modules/Asistencias/domain/entities/Asistencias';
import TYPESDEPENDENCIESGLOBAL from '@common/dependencies/TypesDependencies';
import PostgresException from '@common/http/exceptions/PostgresException';
import { logger } from '@common/logger/Logger';
import { IListarAsistenciasIn } from '@modules/Asistencias/usecase/dto/in/IAsistenciasIn';

@injectable()
export default class PostgresAsistenciasRepository implements AsistenciasRepository {
    constructor(@inject(TYPESDEPENDENCIESGLOBAL.db) private db: IDatabase<unknown>) {}

    schema = '"public"';

    async consultar(id: number): Promise<Asistencias | null> {
        try {
            const result = await this.db.oneOrNone('SELECT * FROM public.asistencias WHERE id_asistencia = $/id/', {
                id,
            });
            return result ? new Asistencias(result) : null;
        } catch (error) {
            logger.error('ASISTENCIAS', 'consultar', [`Error consultando asistencia: ${error.message}`]);
            throw new PostgresException(500, `Error en la consulta de postgres: ${error.message}`);
        }
    }

    async crear(asistencia: Asistencias): Promise<Asistencias> {
        try {
            const result = await this.db.one(
                'INSERT INTO public.asistencias(id_usuario, id_evento) VALUES($/id_usuario/, $/id_evento/) RETURNING *',
                asistencia,
            );
            return new Asistencias(result);
        } catch (error) {
            logger.error('ASISTENCIAS', 'crear', [`Error creando asistencia: ${error}`]);
            throw new PostgresException(500, `Error creando asistencia: ${error.message}`);
        }
    }

    async eliminar(id: number): Promise<void> {
        try {
            await this.db.none('DELETE FROM public.asistencias WHERE id_asistencia = $/id/', { id });
        } catch (error) {
            logger.error('ASISTENCIAS', 'eliminar', [`Error eliminando asistencia: ${error}`]);
            throw new PostgresException(500, `Error eliminando asistencia: ${error.message}`);
        }
    }

    async listar(filtros: IListarAsistenciasIn): Promise<Asistencias[]> {
        try {
            let query = 'SELECT * FROM public.asistencias WHERE 1=1';
            if (filtros.id_usuario) query += ' AND id_usuario = $/id_usuario/';
            if (filtros.id_evento) query += ' AND id_evento = $/id_evento/';
            query += ' ORDER BY creado_en DESC LIMIT $/limit/ OFFSET $/offset/';

            const asistencias = await this.db.any(query, {
                ...filtros,
                offset: ((filtros.page ?? 1) - 1) * (filtros.limit ?? 10),
            });
            return asistencias.map((asistencia) => new Asistencias(asistencia));
        } catch (error) {
            logger.error('ASISTENCIAS', 'listar', [`Error listando asistencias: ${error}`]);
            throw new PostgresException(500, `Error listando asistencias: ${error.message}`);
        }
    }

    async buscarPorUsuarioYEvento(idUsuario: number, idEvento: number): Promise<Asistencias | null> {
        try {
            const result = await this.db.oneOrNone(
                'SELECT * FROM public.asistencias WHERE id_usuario = $/idUsuario/ AND id_evento = $/idEvento/',
                { idUsuario, idEvento },
            );
            return result ? new Asistencias(result) : null;
        } catch (error) {
            logger.error('ASISTENCIAS', 'buscarPorUsuarioYEvento', [`Error buscando asistencia: ${error}`]);
            throw new PostgresException(500, `Error buscando asistencia: ${error.message}`);
        }
    }

    async contarAsistencias(filtros: Omit<IListarAsistenciasIn, 'page' | 'limit'>): Promise<number> {
        try {
            let query = 'SELECT COUNT(*) FROM public.asistencias WHERE 1=1';
            if (filtros.id_usuario) query += ' AND id_usuario = $/id_usuario/';
            if (filtros.id_evento) query += ' AND id_evento = $/id_evento/';

            const result = await this.db.one(query, filtros);
            return parseInt(result.count, 10);
        } catch (error) {
            logger.error('ASISTENCIAS', 'contarAsistencias', [`Error contando asistencias: ${error}`]);
            throw new PostgresException(500, `Error contando asistencias: ${error.message}`);
        }
    }

    async existeUsuario(idUsuario: number): Promise<boolean> {
        try {
            const result = await this.db.oneOrNone(
                'SELECT id_usuario FROM public.usuarios WHERE id_usuario = $/idUsuario/',
                { idUsuario },
            );
            return !!result;
        } catch (error) {
            logger.error('ASISTENCIAS', 'existeUsuario', [`Error verificando existencia de usuario: ${error}`]);
            throw new PostgresException(500, `Error verificando existencia de usuario: ${error.message}`);
        }
    }

    async existeEvento(idEvento: number): Promise<boolean> {
        try {
            const result = await this.db.oneOrNone(
                'SELECT id_evento FROM public.eventos WHERE id_evento = $/idEvento/',
                { idEvento },
            );
            return !!result;
        } catch (error) {
            logger.error('ASISTENCIAS', 'existeEvento', [`Error verificando existencia de evento: ${error}`]);
            throw new PostgresException(500, `Error verificando existencia de evento: ${error.message}`);
        }
    }

    async obtenerUsuario(idUsuario: number): Promise<{ id_usuario: number; nombre_usuario: string }> {
        try {
            const result = await this.db.one(
                'SELECT id_usuario, nombre_usuario FROM public.usuarios WHERE id_usuario = $/idUsuario/',
                { idUsuario },
            );
            return result;
        } catch (error) {
            logger.error('ASISTENCIAS', 'obtenerUsuario', [`Error obteniendo usuario: ${error}`]);
            throw new PostgresException(500, `Error obteniendo usuario: ${error.message}`);
        }
    }

    async obtenerEvento(idEvento: number): Promise<{ id_evento: number; titulo: string }> {
        try {
            const result = await this.db.one(
                'SELECT id_evento, titulo FROM public.eventos WHERE id_evento = $/idEvento/',
                { idEvento },
            );
            return result;
        } catch (error) {
            logger.error('ASISTENCIAS', 'obtenerEvento', [`Error obteniendo evento: ${error}`]);
            throw new PostgresException(500, `Error obteniendo evento: ${error.message}`);
        }
    }
}
