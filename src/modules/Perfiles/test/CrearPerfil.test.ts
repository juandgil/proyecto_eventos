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

describe('Crear Perfil', () => {
    it('Debe crear un perfil correctamente', async () => {
        const request: Req = {
            body: { nombre: 'Perfil Test', descripcion: 'Descripción del perfil de prueba' },
            params: {},
            data: {},
        };
        const response: Response<any> = await perfilesController.crearPerfil(request);
        expect(response.status).toBe(200);
        expect(response.response.data?.ok).toBe('Perfil creado exitosamente');
        expect(response.response.data?.data).toHaveProperty('idPerfil');
        expect(response.response.data?.data.nombre).toBe('Perfil Test');
    });

    it('Debe fallar al crear un perfil con nombre duplicado', async () => {
        const request: Req = {
            body: { nombre: 'Perfil Test', descripcion: 'Otro perfil con el mismo nombre' },
            params: {},
            data: {},
        };
        await expect(perfilesController.crearPerfil(request)).rejects.toThrow();
    });
});
