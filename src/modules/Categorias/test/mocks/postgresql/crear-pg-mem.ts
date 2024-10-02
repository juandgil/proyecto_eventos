import { newDb } from 'pg-mem';
import fs from 'fs';
import path from 'path';
import { IMain, IDatabase } from 'pg-promise';
import { logger } from '@common/logger';

const createMemoryDB = (sqlFilePath: string): IDatabase<IMain> => {
    const dbmem = newDb();
    dbmem.public.interceptQueries((sql) => {
        let newSql = sql.replace(/\bnumeric\s*\(\s*\d+\s*,\s*\d+\s*\)/g, 'float');
        newSql = newSql.replace(/serial4/g, 'serial');
        if (sql !== newSql) {
            return dbmem.public.many(newSql);
        }
        return null;
    });

    try {
        const sql = fs.readFileSync(path.join(__dirname, sqlFilePath), 'utf8');
        dbmem.public.none(sql);

        // Simplificar la creación de la tabla para pg-mem
        dbmem.public.none(`
            CREATE TABLE IF NOT EXISTS public.categorias_eventos (
                id_categoria SERIAL,
                nombre VARCHAR(50),
                creado_en TIMESTAMP,
                actualizado_en TIMESTAMP
            );
        `);
    } catch (error) {
        logger.error('TEST', '182946189264', [`Error creando la base de datos: ${error}`]);
    }

    const pg = dbmem.adapters.createPgPromise();
    return pg;
};

let configuracionesDB: IDatabase<IMain>;

export const mockConfiguracionesDB = (): IDatabase<IMain> => {
    if (!configuracionesDB) {
        configuracionesDB = createMemoryDB('./database.sql');
    }
    return configuracionesDB;
};

export default mockConfiguracionesDB;
