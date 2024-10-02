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
import NotFoundException from '@common/http/exceptions/NotFoundException';

let db: ReturnType<typeof mockConfiguracionesDB>;
let perfilesController: PerfilesController;

beforeAll(async () => {
    createDependencies();
    db = mockConfiguracionesDB();

    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPESDEPENDENCIESGLOBAL.db).toConstantValue(db);

    perfilesController = new PerfilesController();
});

describe('Eliminar Perfil', () => {
    it('Debe eliminar un perfil correctamente', async () => {
        // Primero, creamos un perfil
        const crearRequest: Req = {
            body: { nombre: 'Perfil para Eliminar', descripcion: 'Este perfil será eliminado' },
            params: {},
            data: {},
        };
        const crearResponse: Response<any> = await perfilesController.crearPerfil(crearRequest);
        const idPerfil = crearResponse.response.data?.data.idPerfil;

        // Ahora, eliminamos el perfil
        const eliminarRequest: Req = {
            body: {},
            params: { id: idPerfil.toString() },
            data: {},
        };
        const eliminarResponse: Response<any> = await perfilesController.eliminarPerfil(eliminarRequest);
        expect(eliminarResponse.status).toBe(200);
        expect(eliminarResponse.response.data?.ok).toBe('Perfil eliminado exitosamente');

        // Intentamos consultar el perfil eliminado
        const consultarRequest: Req = {
            body: {},
            params: { id: idPerfil.toString() },
            data: {},
        };
        await expect(perfilesController.consultarPerfil(consultarRequest)).rejects.toThrow(NotFoundException);
    });

    it('Debe fallar al eliminar un perfil inexistente', async () => {
        const request: Req = {
            body: {},
            params: { id: '9999' },
            data: {},
        };
        await expect(perfilesController.eliminarPerfil(request)).rejects.toThrow(NotFoundException);
    });
});
