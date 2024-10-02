import { injectable, inject } from 'inversify';
import { IDatabase } from 'pg-promise';
import { CategoriasRepository } from '@modules/Categorias/domain/repositories/CategoriasRepository';
import Categorias from '@modules/Categorias/domain/entities/Categorias';
import TYPESDEPENDENCIESGLOBAL from '@common/dependencies/TypesDependencies';
import PostgresException from '@common/http/exceptions/PostgresException';
import { logger } from '@common/logger/Logger';

@injectable()
export default class PostgresCategoriasRepository implements CategoriasRepository {
    constructor(@inject(TYPESDEPENDENCIESGLOBAL.db) private db: IDatabase<unknown>) {}

    schema = '"public"';

    async consultar(id: number): Promise<Categorias | null> {
        try {
            const result = await this.db.oneOrNone('SELECT * FROM public.categorias_eventos WHERE id_categoria = $1', [
                id,
            ]);
            return result ? new Categorias(result) : null;
        } catch (error) {
            logger.error('CATEGORIAS', 'consultar', [`Error consultando categoría: ${error.message}`]);
            throw new PostgresException(500, `Error en la consulta de postgres: ${error.message}`);
        }
    }

    async crear(categoria: Categorias): Promise<Categorias> {
        try {
            const result = await this.db.one('INSERT INTO public.categorias_eventos(nombre) VALUES($1) RETURNING *', [
                categoria.nombre,
            ]);
            return new Categorias(result);
        } catch (error) {
            logger.error('CATEGORIAS', 'crear', [`Error creando categoría: ${error}`]);
            throw new PostgresException(500, `Error creando categoría: ${error.message}`);
        }
    }

    async actualizar(id: number, nombre: string): Promise<Categorias> {
        try {
            const result = await this.db.one(
                'UPDATE public.categorias_eventos SET nombre = $1 WHERE id_categoria = $2 RETURNING *',
                [nombre, id],
            );
            return new Categorias(result);
        } catch (error) {
            logger.error('CATEGORIAS', 'actualizar', [`Error actualizando categoría: ${error}`]);
            throw new PostgresException(500, `Error actualizando categoría: ${error.message}`);
        }
    }

    async eliminar(id: number): Promise<void> {
        try {
            await this.db.none('DELETE FROM public.categorias_eventos WHERE id_categoria = $1', [id]);
        } catch (error) {
            logger.error('CATEGORIAS', 'eliminar', [`Error eliminando categoría: ${error}`]);
            throw new PostgresException(500, `Error eliminando categoría: ${error.message}`);
        }
    }

    async listar(): Promise<Categorias[]> {
        try {
            const categorias = await this.db.any('SELECT * FROM public.categorias_eventos');
            return categorias.map((categoria) => new Categorias(categoria));
        } catch (error) {
            logger.error('CATEGORIAS', 'listar', [`Error listando categorías: ${error}`]);
            throw new PostgresException(500, `Error listando categorías: ${error.message}`);
        }
    }

    async buscarPorNombre(nombre: string): Promise<Categorias[]> {
        try {
            const categorias = await this.db.any('SELECT * FROM public.categorias_eventos WHERE nombre = $1', [nombre]);
            return categorias.map((categoria) => new Categorias(categoria));
        } catch (error) {
            logger.error('CATEGORIAS', 'buscarPorNombre', [`Error buscando categorías por nombre: ${error}`]);
            throw new PostgresException(500, `Error buscando categorías por nombre: ${error.message}`);
        }
    }
}
