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

        // Actualizar la creación de la tabla eventos para que coincida con el DDL real
        dbmem.public.none(`
            CREATE TABLE IF NOT EXISTS public.eventos (
                id_evento SERIAL PRIMARY KEY,
                titulo VARCHAR(100) NOT NULL,
                descripcion TEXT,
                fecha_inicio TIMESTAMP NOT NULL,
                fecha_fin TIMESTAMP NOT NULL,
                id_creador INTEGER,
                id_ubicacion INTEGER,
                id_categoria INTEGER,
                creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT eventos_usuarios_fk FOREIGN KEY (id_creador) REFERENCES Usuarios(id_usuario),
                CONSTRAINT eventos_ubicaciones_fk FOREIGN KEY (id_ubicacion) REFERENCES Ubicaciones(id_ubicacion),
                CONSTRAINT eventos_categorias_fk FOREIGN KEY (id_categoria) REFERENCES Categorias_Eventos(id_categoria)
            );
        `);

        // Crear tablas adicionales necesarias para los eventos
        dbmem.public.none(`
            CREATE TABLE IF NOT EXISTS public.usuarios (
                id_usuario SERIAL PRIMARY KEY,
                nombre_usuario VARCHAR(50) NOT NULL,
                correo VARCHAR(100) NOT NULL,
                hash_contrasena VARCHAR(255) NOT NULL,
                id_perfil INTEGER,
                activo BOOLEAN DEFAULT TRUE,
                creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS public.categorias_eventos (
                id_categoria SERIAL PRIMARY KEY,
                nombre VARCHAR(50) NOT NULL,
                creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

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

let eventosDB: IDatabase<IMain>;

export const mockConfiguracionesDB = (): IDatabase<IMain> => {
    if (!eventosDB) {
        eventosDB = createMemoryDB('./database.sql');
    }
    return eventosDB;
};

export default mockConfiguracionesDB;
