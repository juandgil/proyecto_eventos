import { injectable, inject } from 'inversify';
import { IDatabase } from 'pg-promise';
import { PerfilesRepository } from '@modules/Perfiles/domain/repositories/PerfilesRepository';
import Perfiles from '@modules/Perfiles/domain/entities/Perfiles';
import TYPESDEPENDENCIESGLOBAL from '@common/dependencies/TypesDependencies';
import PostgresException from '@common/http/exceptions/PostgresException';
import { logger } from '@common/logger/Logger';

@injectable()
export default class PostgresPerfilesRepository implements PerfilesRepository {
    constructor(@inject(TYPESDEPENDENCIESGLOBAL.db) private db: IDatabase<unknown>) {}

    schema = '"public"';

    async consultarPorId(idPerfil: number): Promise<Perfiles | null> {
        try {
            const result = await this.db.oneOrNone('SELECT * FROM public.perfiles WHERE id_perfil = $1', [idPerfil]);
            return result ? new Perfiles(result) : null;
        } catch (error) {
            logger.error('PERFILES', 'consultarPorId', [`Error consultando perfil: ${error.message}`]);
            throw new PostgresException(500, `Error en la consulta de postgres: ${error.message}`);
        }
    }

    async crear(perfil: Perfiles): Promise<Perfiles> {
        try {
            const result = await this.db.one(
                'INSERT INTO public.perfiles(nombre, descripcion) VALUES($1, $2) RETURNING *',
                [perfil.nombre, perfil.descripcion],
            );
            return new Perfiles(result);
        } catch (error) {
            logger.error('PERFILES', 'crear', [`Error creando perfil: ${error}`]);
            throw new PostgresException(500, `Error creando perfil: ${error.message}`);
        }
    }

    async actualizar(perfil: Perfiles): Promise<Perfiles> {
        try {
            const result = await this.db.one(
                'UPDATE public.perfiles SET nombre = $1, descripcion = $2 WHERE id_perfil = $3 RETURNING *',
                [perfil.nombre, perfil.descripcion, perfil.idPerfil],
            );
            return new Perfiles(result);
        } catch (error) {
            logger.error('PERFILES', 'actualizar', [`Error actualizando perfil: ${error}`]);
            throw new PostgresException(500, `Error actualizando perfil: ${error.message}`);
        }
    }

    async eliminar(idPerfil: number): Promise<void> {
        try {
            await this.db.none('DELETE FROM public.perfiles WHERE id_perfil = $1', [idPerfil]);
        } catch (error) {
            logger.error('PERFILES', 'eliminar', [`Error eliminando perfil: ${error}`]);
            throw new PostgresException(500, `Error eliminando perfil: ${error.message}`);
        }
    }

    async listar(): Promise<Perfiles[]> {
        try {
            const perfiles = await this.db.any('SELECT * FROM public.perfiles');
            return perfiles.map((perfil) => new Perfiles(perfil));
        } catch (error) {
            logger.error('PERFILES', 'listar', [`Error listando perfiles: ${error}`]);
            throw new PostgresException(500, `Error listando perfiles: ${error.message}`);
        }
    }
}
