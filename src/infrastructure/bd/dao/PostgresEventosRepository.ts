import { injectable, inject } from 'inversify';
import { IDatabase } from 'pg-promise';
import { EventosRepository } from '@modules/eventos/domain/repositories/EventosRepository';
import Eventos from '@modules/eventos/domain/entities/Eventos';
import TYPESDEPENDENCIESGLOBAL from '@common/dependencies/TypesDependencies';
import PostgresException from '@common/http/exceptions/PostgresException';
import { logger } from '@common/logger/Logger';
import { IListarEventosIn } from '@modules/eventos/usecase/dto/in/IEventosIn';

@injectable()
export default class PostgresEventosRepository implements EventosRepository {
    constructor(@inject(TYPESDEPENDENCIESGLOBAL.db) private db: IDatabase<unknown>) {}

    schema = '"public"';

    async consultar(id: number): Promise<Eventos | null> {
        try {
            const result = await this.db.oneOrNone('SELECT * FROM public.eventos WHERE id_evento = $/id/', { id });
            return result ? new Eventos(result) : null;
        } catch (error) {
            logger.error('EVENTOS', 'consultar', [`Error consultando evento: ${error.message}`]);
            throw new PostgresException(500, `Error en la consulta de postgres: ${error.message}`);
        }
    }

    async crear(evento: Eventos): Promise<Eventos> {
        try {
            const result = await this.db.one(
                'INSERT INTO public.eventos(titulo, descripcion, fecha_inicio, fecha_fin, id_creador, id_ubicacion, id_categoria) VALUES($/titulo/, $/descripcion/, $/fecha_inicio/, $/fecha_fin/, $/id_creador/, $/id_ubicacion/, $/id_categoria/) RETURNING *',
                evento,
            );
            return new Eventos(result);
        } catch (error) {
            logger.error('EVENTOS', 'crear', [`Error creando evento: ${error}`]);
            throw new PostgresException(500, `Error creando evento: ${error.message}`);
        }
    }

    async actualizar(id: number, evento: Eventos): Promise<Eventos> {
        try {
            const result = await this.db.one(
                'UPDATE public.eventos SET titulo = $/titulo/, descripcion = $/descripcion/, fecha_inicio = $/fecha_inicio/, fecha_fin = $/fecha_fin/, id_creador = $/id_creador/, id_ubicacion = $/id_ubicacion/, id_categoria = $/id_categoria/ WHERE id_evento = $/id/ RETURNING *',
                { ...evento, id },
            );
            return new Eventos(result);
        } catch (error) {
            logger.error('EVENTOS', 'actualizar', [`Error actualizando evento: ${error}`]);
            throw new PostgresException(500, `Error actualizando evento: ${error.message}`);
        }
    }

    async eliminar(id: number): Promise<void> {
        try {
            await this.db.none('DELETE FROM public.eventos WHERE id_evento = $/id/', { id });
        } catch (error) {
            logger.error('EVENTOS', 'eliminar', [`Error eliminando evento: ${error}`]);
            throw new PostgresException(500, `Error eliminando evento: ${error.message}`);
        }
    }

    async listar(filtros: IListarEventosIn): Promise<Eventos[]> {
        try {
            let query = 'SELECT * FROM public.eventos WHERE 1=1';
            if (filtros.fecha_inicio) query += ' AND fecha_inicio >= $/fecha_inicio/';
            if (filtros.fecha_fin) query += ' AND fecha_fin <= $/fecha_fin/';
            if (filtros.id_categoria) query += ' AND id_categoria = $/id_categoria/';
            if (filtros.id_ubicacion) query += ' AND id_ubicacion = $/id_ubicacion/';
            query += ' ORDER BY fecha_inicio LIMIT $/limit/ OFFSET $/offset/';

            const eventos = await this.db.any(query, {
                ...filtros,
                offset: ((filtros.page ?? 1) - 1) * (filtros.limit ?? 10),
            });
            return eventos.map((evento) => new Eventos(evento));
        } catch (error) {
            logger.error('EVENTOS', 'listar', [`Error listando eventos: ${error}`]);
            throw new PostgresException(500, `Error listando eventos: ${error.message}`);
        }
    }

    async buscarPorTitulo(titulo: string): Promise<Eventos[]> {
        try {
            const eventos = await this.db.any('SELECT * FROM public.eventos WHERE titulo = $/titulo/', { titulo });
            return eventos.map((evento) => new Eventos(evento));
        } catch (error) {
            logger.error('EVENTOS', 'buscarPorTitulo', [`Error buscando eventos por título: ${error}`]);
            throw new PostgresException(500, `Error buscando eventos por título: ${error.message}`);
        }
    }

    async contarEventos(filtros: Omit<IListarEventosIn, 'page' | 'limit'>): Promise<number> {
        try {
            let query = 'SELECT COUNT(*) FROM public.eventos WHERE 1=1';
            if (filtros.fecha_inicio) query += ' AND fecha_inicio >= $/fecha_inicio/';
            if (filtros.fecha_fin) query += ' AND fecha_fin <= $/fecha_fin/';
            if (filtros.id_categoria) query += ' AND id_categoria = $/id_categoria/';
            if (filtros.id_ubicacion) query += ' AND id_ubicacion = $/id_ubicacion/';

            const result = await this.db.one(query, filtros);
            return parseInt(result.count, 10);
        } catch (error) {
            logger.error('EVENTOS', 'contarEventos', [`Error contando eventos: ${error}`]);
            throw new PostgresException(500, `Error contando eventos: ${error.message}`);
        }
    }

    async existeCreador(idCreador: number): Promise<boolean> {
        try {
            const result = await this.db.oneOrNone('SELECT id_usuario FROM public.usuarios WHERE id_usuario = $/idCreador/', { idCreador });
            return !!result;
        } catch (error) {
            logger.error('EVENTOS', 'existeCreador', [`Error verificando existencia de creador: ${error}`]);
            throw new PostgresException(500, `Error verificando existencia de creador: ${error.message}`);
        }
    }

    async existeUbicacion(idUbicacion: number): Promise<boolean> {
        try {
            const result = await this.db.oneOrNone('SELECT id_ubicacion FROM public.ubicaciones WHERE id_ubicacion = $/idUbicacion/', { idUbicacion });
            return !!result;
        } catch (error) {
            logger.error('EVENTOS', 'existeUbicacion', [`Error verificando existencia de ubicación: ${error}`]);
            throw new PostgresException(500, `Error verificando existencia de ubicación: ${error.message}`);
        }
    }

    async existeCategoria(idCategoria: number): Promise<boolean> {
        try {
            const result = await this.db.oneOrNone('SELECT id_categoria FROM public.categorias_eventos WHERE id_categoria = $/idCategoria/', { idCategoria });
            return !!result;
        } catch (error) {
            logger.error('EVENTOS', 'existeCategoria', [`Error verificando existencia de categoría: ${error}`]);
            throw new PostgresException(500, `Error verificando existencia de categoría: ${error.message}`);
        }
    }

    async tieneAsistentes(idEvento: number): Promise<boolean> {
        try {
            const result = await this.db.oneOrNone('SELECT id_asistencia FROM public.asistencias WHERE id_evento = $/idEvento/ LIMIT 1', { idEvento });
            return !!result;
        } catch (error) {
            logger.error('EVENTOS', 'tieneAsistentes', [`Error verificando asistentes del evento: ${error}`]);
            throw new PostgresException(500, `Error verificando asistentes del evento: ${error.message}`);
        }
    }

    async obtenerCreador(idCreador: number): Promise<{ id_usuario: number; nombre_usuario: string }> {
        try {
            const result = await this.db.one('SELECT id_usuario, nombre_usuario FROM public.usuarios WHERE id_usuario = $/idCreador/', { idCreador });
            return result;
        } catch (error) {
            logger.error('EVENTOS', 'obtenerCreador', [`Error obteniendo creador: ${error}`]);
            throw new PostgresException(500, `Error obteniendo creador: ${error.message}`);
        }
    }

    async obtenerUbicacion(idUbicacion: number): Promise<{ id_ubicacion: number; nombre: string; direccion: string }> {
        try {
            const result = await this.db.one('SELECT id_ubicacion, nombre, direccion FROM public.ubicaciones WHERE id_ubicacion = $/idUbicacion/', { idUbicacion });
            return result;
        } catch (error) {
            logger.error('EVENTOS', 'obtenerUbicacion', [`Error obteniendo ubicación: ${error}`]);
            throw new PostgresException(500, `Error obteniendo ubicación: ${error.message}`);
        }
    }

    async obtenerCategoria(idCategoria: number): Promise<{ id_categoria: number; nombre: string }> {
        try {
            const result = await this.db.one('SELECT id_categoria, nombre FROM public.categorias_eventos WHERE id_categoria = $/idCategoria/', { idCategoria });
            return result;
        } catch (error) {
            logger.error('EVENTOS', 'obtenerCategoria', [`Error obteniendo categoría: ${error}`]);
            throw new PostgresException(500, `Error obteniendo categoría: ${error.message}`);
        }
    }
}
