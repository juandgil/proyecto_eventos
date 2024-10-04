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

describe('Actualizar Perfil', () => {
    it('Debe actualizar un perfil correctamente', async () => {
        // Primero, creamos un perfil
        const crearRequest: Req = {
            body: { nombre: 'Perfil para Actualizar', descripcion: 'Descripción inicial' },
            params: {},
            data: {},
            file: {},
        };
        const crearResponse: Response<any> = await perfilesController.crearPerfil(crearRequest);
        const idPerfil = crearResponse.response.data?.data.idPerfil;

        // Ahora, actualizamos el perfil
        const actualizarRequest: Req = {
            body: { id_perfil: idPerfil, nombre: 'Perfil Actualizado', descripcion: 'Nueva descripción' },
            params: {},
            data: {},
            file: {},
        };
        const actualizarResponse: Response<any> = await perfilesController.actualizarPerfil(actualizarRequest);
        expect(actualizarResponse.status).toBe(200);
        expect(actualizarResponse.response.data?.ok).toBe('Perfil actualizado exitosamente');
        expect(actualizarResponse.response.data?.data.nombre).toBe('Perfil Actualizado');
        expect(actualizarResponse.response.data?.data.descripcion).toBe('Nueva descripción');
    });

    it('Debe fallar al actualizar un perfil inexistente', async () => {
        const request: Req = {
            body: { id_perfil: 9999, nombre: 'Perfil Inexistente', descripcion: 'No debería actualizarse' },
            params: {},
            data: {},
            file: {},
        };
        await expect(perfilesController.actualizarPerfil(request)).rejects.toThrow();
    });
});
