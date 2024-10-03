import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import TYPESDEPENDENCIESGLOBAL from '@common/dependencies/TypesDependencies';
import { IDatabase, IMain } from 'pg-promise';

export default async function limpiarBaseDeDatos() {
    const db = DEPENDENCY_CONTAINER.get<IDatabase<IMain>>(TYPESDEPENDENCIESGLOBAL.db);

    // Obtener todas las tablas de la base de datos
    const tables = await db.manyOrNone(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `);

    // Truncar todas las tablas excepto las que no queremos limpiar
    tables
        .filter((table) => !['perfiles', 'usuarios', 'categorias_eventos', 'ubicaciones'].includes(table.table_name))
        .forEach((table) => db.none(`TRUNCATE TABLE ${table.table_name} CASCADE`));
}
