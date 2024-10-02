import { injectable, inject } from 'inversify';
import { IDatabase } from 'pg-promise';
import { UbicacionesRepository } from '@modules/Ubicaciones/domain/repositories/UbicacionesRepository';
import Ubicaciones from '@modules/Ubicaciones/domain/entities/Ubicaciones';
import TYPESDEPENDENCIESGLOBAL from '@common/dependencies/TypesDependencies';
import PostgresException from '@common/http/exceptions/PostgresException';
import { logger } from '@common/logger/Logger';

@injectable()
export default class PostgresUbicacionesRepository implements UbicacionesRepository {
    constructor(@inject(TYPESDEPENDENCIESGLOBAL.db) private db: IDatabase<unknown>) {}

    schema = '"public"';

    async consultar(id: number): Promise<Ubicaciones | null> {
        try {
            const result = await this.db.oneOrNone('SELECT * FROM public.ubicaciones WHERE id_ubicacion = $1', [id]);
            return result ? new Ubicaciones(result) : null;
        } catch (error) {
            logger.error('UBICACIONES', 'consultar', [`Error consultando ubicación: ${error.message}`]);
            throw new PostgresException(500, `Error en la consulta de postgres: ${error.message}`);
        }
    }

    async crear(ubicacion: Ubicaciones): Promise<Ubicaciones> {
        try {
            const result = await this.db.one(
                'INSERT INTO public.ubicaciones(nombre, direccion, latitud, longitud) VALUES($1, $2, $3, $4) RETURNING *',
                [ubicacion.nombre, ubicacion.direccion, ubicacion.latitud, ubicacion.longitud],
            );
            return new Ubicaciones(result);
        } catch (error) {
            logger.error('UBICACIONES', 'crear', [`Error creando ubicación: ${error}`]);
            throw new PostgresException(500, `Error creando ubicación: ${error.message}`);
        }
    }

    async actualizar(id: number, ubicacion: Ubicaciones): Promise<Ubicaciones> {
        try {
            const result = await this.db.one(
                'UPDATE public.ubicaciones SET nombre = $1, direccion = $2, latitud = $3, longitud = $4 WHERE id_ubicacion = $5 RETURNING *',
                [ubicacion.nombre, ubicacion.direccion, ubicacion.latitud, ubicacion.longitud, id],
            );
            return new Ubicaciones(result);
        } catch (error) {
            logger.error('UBICACIONES', 'actualizar', [`Error actualizando ubicación: ${error}`]);
            throw new PostgresException(500, `Error actualizando ubicación: ${error.message}`);
        }
    }

    async eliminar(id: number): Promise<void> {
        try {
            await this.db.none('DELETE FROM public.ubicaciones WHERE id_ubicacion = $1', [id]);
        } catch (error) {
            logger.error('UBICACIONES', 'eliminar', [`Error eliminando ubicación: ${error}`]);
            throw new PostgresException(500, `Error eliminando ubicación: ${error.message}`);
        }
    }

    async listar(): Promise<Ubicaciones[]> {
        try {
            const ubicaciones = await this.db.any('SELECT * FROM public.ubicaciones');
            return ubicaciones.map((ubicacion) => new Ubicaciones(ubicacion));
        } catch (error) {
            logger.error('UBICACIONES', 'listar', [`Error listando ubicaciones: ${error}`]);
            throw new PostgresException(500, `Error listando ubicaciones: ${error.message}`);
        }
    }

    async buscarPorNombre(nombre: string): Promise<Ubicaciones[]> {
        try {
            const ubicaciones = await this.db.any('SELECT * FROM public.ubicaciones WHERE nombre = $1', [nombre]);
            return ubicaciones.map((ubicacion) => new Ubicaciones(ubicacion));
        } catch (error) {
            logger.error('UBICACIONES', 'buscarPorNombre', [`Error buscando ubicaciones por nombre: ${error}`]);
            throw new PostgresException(500, `Error buscando ubicaciones por nombre: ${error.message}`);
        }
    }
}
