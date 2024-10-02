import 'reflect-metadata';
import NotFoundException from '@common/http/exceptions/NotFoundException';
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

describe('Consultar Perfil', () => {
    it('Debe consultar un perfil correctamente', async () => {
        // Primero, creamos un perfil
        const crearRequest: Req = {
            body: { nombre: 'Perfil para Consultar', descripcion: 'Este perfil será consultado' },
            params: {},
            data: {},
        };
        const crearResponse: Response<any> = await perfilesController.crearPerfil(crearRequest);
        const idPerfil = crearResponse.response.data?.data.idPerfil;

        // Ahora, consultamos el perfil
        const consultarRequest: Req = {
            body: {},
            params: { id: idPerfil.toString() },
            data: {},
        };
        const consultarResponse: Response<any> = await perfilesController.consultarPerfil(consultarRequest);
        expect(consultarResponse.status).toBe(200);
        expect(consultarResponse.response.data?.ok).toBe('Perfil consultado exitosamente');
        expect(consultarResponse.response.data?.data.idPerfil).toBe(idPerfil);
        expect(consultarResponse.response.data?.data.nombre).toBe('Perfil para Consultar');
    });

    it('Debe fallar al consultar un perfil inexistente', async () => {
        const request: Req = {
            body: {},
            params: { id: '9999' },
            data: {},
        };
        await expect(perfilesController.consultarPerfil(request)).rejects.toThrow(NotFoundException);
    });
});
