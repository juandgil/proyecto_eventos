import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import TYPESDEPENDENCIESGLOBAL from '@common/dependencies/TypesDependencies';
import { IDatabase } from 'pg-promise';

export default async function limpiarBaseDeDatos(): Promise<void> {
    const db = DEPENDENCY_CONTAINER.get<IDatabase<any>>(TYPESDEPENDENCIESGLOBAL.db);
    await db.none('TRUNCATE TABLE public.categorias_eventos RESTART IDENTITY CASCADE');
}
