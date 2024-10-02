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
import NotFoundException from '@common/http/exceptions/NotFoundException';
import limpiarBaseDeDatos from '../../../common/util/testUtils';

let db: ReturnType<typeof mockConfiguracionesDB>;
let categoriasController: CategoriasController;

beforeAll(async () => {
    createDependencies();
    db = mockConfiguracionesDB();

    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPESDEPENDENCIESGLOBAL.db).toConstantValue(db);

    categoriasController = new CategoriasController();
});

describe('Eliminar Categoria', () => {
    beforeEach(async () => {
        // Limpiar la base de datos o el repositorio mock antes de cada test
        await limpiarBaseDeDatos(); // Implementa esta función según tu setup
    });

    it('Debe eliminar una categoría correctamente', async () => {
        // Crear la categoría primero
        const crearRequest: Req = {
            body: { nombre: 'Categoría para Eliminar', descripcion: 'Descripción' },
            params: {},
            data: {},
        };
        const categoriaCreada = await categoriasController.crearCategoria(crearRequest);
        const idCategoria = (categoriaCreada.response.data as any).data.id_categoria;

        // Ahora eliminar la categoría
        const eliminarRequest: Req = {
            body: {},
            params: { id: idCategoria.toString() },
            data: {},
        };
        const resultado = await categoriasController.eliminarCategoria(eliminarRequest);
        expect(resultado.status).toBe(200);
        expect(resultado.response.data?.ok).toBe('Categoría eliminada exitosamente');
    });

    it('Debe fallar al eliminar una categoría inexistente', async () => {
        const request: Req = {
            body: {},
            params: { id: '9999' },
            data: {},
        };
        await expect(categoriasController.eliminarCategoria(request)).rejects.toThrow(NotFoundException);
    });
});
