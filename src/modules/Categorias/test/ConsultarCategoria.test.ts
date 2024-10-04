import 'reflect-metadata';
import NotFoundException from '@common/http/exceptions/NotFoundException';
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

describe('Consultar Categoria', () => {
    it('Debe consultar una categoría correctamente', async () => {
        // Primero, creamos una categoría
        const crearRequest: Req = {
            body: { nombre: 'Categoría para Consultar' },
            params: {},
            data: {},
            file: {},
        };
        const crearResponse: Response<any> = await categoriasController.crearCategoria(crearRequest);
        const idCategoria = crearResponse.response.data?.data.id_categoria;

        // Ahora, consultamos la categoría
        const consultarRequest: Req = {
            body: {},
            params: { id: idCategoria.toString() },
            data: {},
        };
        const consultarResponse: Response<any> = await categoriasController.consultarCategoria(consultarRequest);
        expect(consultarResponse.status).toBe(200);
        expect(consultarResponse.response.data?.ok).toBe('Categoría consultada exitosamente');
        expect(consultarResponse.response.data?.data.id_categoria).toBe(idCategoria);
        expect(consultarResponse.response.data?.data.nombre).toBe('Categoría para Consultar');
    });

    it('Debe fallar al consultar una categoría inexistente', async () => {
        const request: Req = {
            body: {},
            params: { id: '9999' },
            data: {},
        };
        await expect(categoriasController.consultarCategoria(request)).rejects.toThrow(NotFoundException);
    });
});
