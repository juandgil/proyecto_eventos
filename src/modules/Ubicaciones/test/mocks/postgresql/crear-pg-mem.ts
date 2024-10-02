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

        // Actualizar la creación de la tabla ubicaciones para que coincida con el DDL real
        dbmem.public.none(`
            CREATE TABLE IF NOT EXISTS public.ubicaciones (
                id_ubicacion SERIAL PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                direccion VARCHAR(255) NOT NULL,
                latitud FLOAT NOT NULL,
                longitud FLOAT NOT NULL,
                creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
    } catch (error) {
        logger.error('TEST', '182946189264', [`Error creando la base de datos: ${error}`]);
    }

    const pg = dbmem.adapters.createPgPromise();
    return pg;
};

let ubicacionesDB: IDatabase<IMain>;

export const mockConfiguracionesDB = (): IDatabase<IMain> => {
    if (!ubicacionesDB) {
        ubicacionesDB = createMemoryDB('./database.sql');
    }
    return ubicacionesDB;
};

export default mockConfiguracionesDB;
