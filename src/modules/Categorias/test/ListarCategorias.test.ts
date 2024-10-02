import 'reflect-metadata';
import { mockConfiguracionesDB } from './mocks/postgresql/crear-pg-mem';
import CategoriasController from '../controllers/CategoriasController';
import { Req } from '@modules/shared/infrastructure';
import { Response } from '@common/http/Response';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import createDependencies from '../dependencies/Dependencies';
import { IDatabase, IMain } from 'pg-promise';
import TYPESDEPENDENCIESGLOBAL from '@common/dependencies/TypesDependencies';
import { beforeAll, describe, expect, it } from '@jest/globals';

let db: ReturnType<typeof mockConfiguracionesDB>;
let categoriasController: CategoriasController;

beforeAll(async () => {
    createDependencies();
    db = mockConfiguracionesDB();

    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPESDEPENDENCIESGLOBAL.db).toConstantValue(db);

    categoriasController = new CategoriasController();
});

describe('Listar Categorias', () => {
    it('Debe listar las categorías correctamente', async () => {
        // Primero, creamos algunas categorías
        const categorias = [{ nombre: 'Categoría 1' }, { nombre: 'Categoría 2' }, { nombre: 'Categoría 3' }];

        for (const categoria of categorias) {
            await categoriasController.crearCategoria({ body: categoria, params: {}, data: {} });
        }

        // Ahora, listamos las categorías
        const listarRequest: Req = {
            body: {},
            params: {},
            data: {},
        };
        const listarResponse: Response<any> = await categoriasController.listarCategorias();
        expect(listarResponse.status).toBe(200);
        expect(listarResponse.response.data?.ok).toBe('Categorías listadas exitosamente');
        expect(Array.isArray(listarResponse.response.data?.data)).toBe(true);
        expect(listarResponse.response.data?.data.length).toBeGreaterThanOrEqual(categorias.length);

        // Verificamos que las categorías creadas estén en la lista
        for (const categoria of categorias) {
            const categoriaEncontrada = listarResponse.response.data?.data.find(
                (c: any) => c.nombre === categoria.nombre,
            );
            expect(categoriaEncontrada).toBeDefined();
        }
    });
});
