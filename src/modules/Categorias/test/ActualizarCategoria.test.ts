import 'reflect-metadata';
import { mockConfiguracionesDB } from './mocks/postgresql/crear-pg-mem';
import CategoriasController from '../controllers/CategoriasController';
import { Req } from '@modules/shared/infrastructure';
import { Response } from '@common/http/Response';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import createDependencies from '../dependencies/Dependencies';
import { IDatabase, IMain } from 'pg-promise';
import TYPESDEPENDENCIESGLOBAL from '@common/dependencies/TypesDependencies';
import { beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import limpiarBaseDeDatos from '@common/util/testUtils';

let db: ReturnType<typeof mockConfiguracionesDB>;
let categoriasController: CategoriasController;

beforeAll(async () => {
    createDependencies();
    db = mockConfiguracionesDB();

    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPESDEPENDENCIESGLOBAL.db).toConstantValue(db);

    categoriasController = new CategoriasController();
});

beforeEach(async () => {
    await limpiarBaseDeDatos();
});

describe('Actualizar Categoria', () => {
    it('Debe actualizar una categoría correctamente', async () => {
        // Primero, creamos una categoría
        const crearRequest: Req = {
            body: { nombre: 'Categoría para Actualizar' },
            params: {},
            data: {},
            file: {},
        };
        const crearResponse: Response<any> = await categoriasController.crearCategoria(crearRequest);
        const idCategoria = crearResponse.response.data?.data.id_categoria;

        // Ahora, actualizamos la categoría
        const actualizarRequest: Req = {
            body: { id_categoria: idCategoria, nombre: 'Categoría Actualizada' },
            params: {},
            data: {},
            file: {},
        };
        const actualizarResponse: Response<any> = await categoriasController.actualizarCategoria(actualizarRequest);
        expect(actualizarResponse.status).toBe(200);
        expect(actualizarResponse.response.data?.ok).toBe('Categoría actualizada exitosamente');
        expect(actualizarResponse.response.data?.data.nombre).toBe('Categoría Actualizada');
    });

    it('Debe fallar al actualizar una categoría inexistente', async () => {
        const request: Req = {
            body: { id_categoria: 9999, nombre: 'Categoría Inexistente' },
            params: {},
            data: {},
            file: {},
        };
        await expect(categoriasController.actualizarCategoria(request)).rejects.toThrow();
    });
});
