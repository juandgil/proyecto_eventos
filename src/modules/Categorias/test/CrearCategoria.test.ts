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
import limpiarBaseDeDatos from '../../../common/util/testUtils';

let db: ReturnType<typeof mockConfiguracionesDB>;
let categoriasController: CategoriasController;

beforeAll(async () => {
    createDependencies();
    db = mockConfiguracionesDB();

    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPESDEPENDENCIESGLOBAL.db).toConstantValue(db);

    categoriasController = new CategoriasController();
});

describe('Crear Categoria', () => {
    beforeEach(async () => {
        await limpiarBaseDeDatos();
    });

    it('Debe crear una categoría correctamente', async () => {
        const request: Req = {
            body: { nombre: 'Categoría Test' },
            params: {},
            data: {},
        };
        const response: Response<any> = await categoriasController.crearCategoria(request);
        expect(response.status).toBe(200);
        expect(response.response.data?.ok).toBe('Categoría creada exitosamente');
        expect(response.response.data?.data).toHaveProperty('id_categoria');
        expect(response.response.data?.data.nombre).toBe('Categoría Test');
    });

    it('Debe fallar al crear una categoría con nombre duplicado', async () => {
        // Primero, creamos una categoría
        await categoriasController.crearCategoria({
            body: { nombre: 'Categoría Test', descripcion: 'Descripción de prueba' },
        } as Req);

        // Luego, intentamos crear otra con el mismo nombre
        await expect(async () => {
            await categoriasController.crearCategoria({
                body: { nombre: 'Categoría Test', descripcion: 'Otra descripción' },
            } as Req);
        }).rejects.toThrow('Ya existe una categoría con el mismo nombre');
    });
});
