import 'reflect-metadata';
import { mockConfiguracionesDB } from './mocks/postgresql/crear-pg-mem';
import PerfilesController from '../controllers/PerfilesController';
import { Req } from '@modules/shared/infrastructure';
import { Response } from '@common/http/Response';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import createDependencies from '../dependencies/Dependencies';
import { IDatabase, IMain } from 'pg-promise';
import TYPESDEPENDENCIESGLOBAL from '@common/dependencies/TypesDependencies';
import { beforeAll, describe, expect, it } from '@jest/globals';

let db: ReturnType<typeof mockConfiguracionesDB>;
let perfilesController: PerfilesController;

beforeAll(async () => {
    createDependencies();
    db = mockConfiguracionesDB();

    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPESDEPENDENCIESGLOBAL.db).toConstantValue(db);

    perfilesController = new PerfilesController();
});

describe('Listar Perfiles', () => {
    it('Debe listar los perfiles correctamente', async () => {
        // Primero, creamos algunos perfiles
        const perfiles = [
            { nombre: 'Perfil 1', descripcion: 'Descripción 1' },
            { nombre: 'Perfil 2', descripcion: 'Descripción 2' },
            { nombre: 'Perfil 3', descripcion: 'Descripción 3' },
        ];

        for (const perfil of perfiles) {
            await perfilesController.crearPerfil({ body: perfil, params: {}, data: {}, file: {} });
        }

        // Ahora, listamos los perfiles
        const listarRequest: Req = {
            body: {},
            params: {},
            data: {},
            file: {},
        };
        const listarResponse: Response<any> = await perfilesController.listarPerfiles();
        expect(listarResponse.status).toBe(200);
        expect(listarResponse.response.data?.ok).toBe('Perfiles listados exitosamente');
        expect(Array.isArray(listarResponse.response.data?.data)).toBe(true);
        expect(listarResponse.response.data?.data.length).toBeGreaterThanOrEqual(perfiles.length);

        // Verificamos que los perfiles creados estén en la lista
        for (const perfil of perfiles) {
            const perfilEncontrado = listarResponse.response.data?.data.find((p: any) => p.nombre === perfil.nombre);
            expect(perfilEncontrado).toBeDefined();
            expect(perfilEncontrado?.descripcion).toBe(perfil.descripcion);
        }
    });
});
