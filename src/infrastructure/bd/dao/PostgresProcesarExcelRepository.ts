import { injectable, inject } from 'inversify';
import { IDatabase } from 'pg-promise';
import { ProcesarExcelRepository } from '@modules/procesarExcel/domain/repositories/ProcesarExcelRepository';
import TYPESDEPENDENCIESGLOBAL from '@common/dependencies/TypesDependencies';
import PostgresException from '@common/http/exceptions/PostgresException';
import { logger } from '@common/logger/Logger';

@injectable()
export default class PostgresProcesarExcelRepository implements ProcesarExcelRepository {
    constructor(@inject(TYPESDEPENDENCIESGLOBAL.db) private db: IDatabase<unknown>) {}

    async guardarArchivo(archivo: Buffer): Promise<string> {
        try {
            const result = await this.db.one(
                'INSERT INTO public.archivos_excel(contenido, estado) VALUES($1, $2) RETURNING id',
                [archivo, 'en_cola'],
            );
            return result.id;
        } catch (error) {
            logger.error('PROCESAR_EXCEL', 'guardarArchivo', [`Error guardando archivo: ${error}`]);
            throw new PostgresException(500, `Error guardando archivo: ${error.message}`);
        }
    }

    async obtenerEstado(id: string): Promise<string> {
        try {
            const result = await this.db.oneOrNone('SELECT estado FROM public.archivos_excel WHERE id = $1', [id]);
            return result ? result.estado : 'no_encontrado';
        } catch (error) {
            logger.error('PROCESAR_EXCEL', 'obtenerEstado', [`Error obteniendo estado: ${error}`]);
            throw new PostgresException(500, `Error obteniendo estado: ${error.message}`);
        }
    }

    async actualizarEstado(id: string, estado: string): Promise<void> {
        try {
            await this.db.none('UPDATE public.archivos_excel SET estado = $1 WHERE id = $2', [estado, id]);
        } catch (error) {
            logger.error('PROCESAR_EXCEL', 'actualizarEstado', [`Error actualizando estado: ${error}`]);
            throw new PostgresException(500, `Error actualizando estado: ${error.message}`);
        }
    }
}
