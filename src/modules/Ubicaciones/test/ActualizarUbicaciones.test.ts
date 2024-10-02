import 'reflect-metadata';
import { mockConfiguracionesDB } from './mocks/postgresql/crear-pg-mem';
import UbicacionesController from '../controllers/UbicacionesController';
import { Req } from '@modules/shared/infrastructure';
import { Response } from '@common/http/Response';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import createDependencies from '../dependencies/Dependencies';
import { IDatabase, IMain } from 'pg-promise';
import TYPESDEPENDENCIESGLOBAL from '@common/dependencies/TypesDependencies';
import { beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import limpiarBaseDeDatos from './mocks/postgresql/testUtils';

let db: ReturnType<typeof mockConfiguracionesDB>;
let ubicacionesController: UbicacionesController;

beforeAll(async () => {
    createDependencies();
    db = mockConfiguracionesDB();

    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPESDEPENDENCIESGLOBAL.db).toConstantValue(db);

    ubicacionesController = new UbicacionesController();
});

beforeEach(async () => {
    await limpiarBaseDeDatos();
});

describe('Actualizar Ubicacion', () => {
    it('Debe actualizar una ubicación correctamente', async () => {
        // Primero, creamos una ubicación
        const crearRequest: Req = {
            body: { nombre: 'Ubicación para Actualizar', direccion: 'Dirección inicial' },
            params: {},
            data: {},
        };
        const crearResponse: Response<any> = await ubicacionesController.crearUbicacion(crearRequest);
        const idUbicacion = crearResponse.response.data?.data.id_ubicacion;

        // Ahora, actualizamos la ubicación
        const actualizarRequest: Req = {
            body: { id_ubicacion: idUbicacion, nombre: 'Ubicación Actualizada', direccion: 'Nueva dirección' },
            params: {},
            data: {},
        };
        const actualizarResponse: Response<any> = await ubicacionesController.actualizarUbicacion(actualizarRequest);
        expect(actualizarResponse.status).toBe(200);
        expect(actualizarResponse.response.data?.ok).toBe('Ubicación actualizada exitosamente');
        expect(actualizarResponse.response.data?.data.nombre).toBe('Ubicación Actualizada');
        expect(actualizarResponse.response.data?.data.direccion).toBe('Nueva dirección');
    });

    it('Debe fallar al actualizar una ubicación inexistente', async () => {
        const request: Req = {
            body: { id_ubicacion: 9999, nombre: 'Ubicación Inexistente', direccion: 'Dirección inexistente' },
            params: {},
            data: {},
        };
        await expect(ubicacionesController.actualizarUbicacion(request)).rejects.toThrow();
    });
});
