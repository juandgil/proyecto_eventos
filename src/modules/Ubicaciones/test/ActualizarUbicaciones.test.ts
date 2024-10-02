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
import limpiarBaseDeDatos from '../../../common/util/testUtils';
import { ICrearUbicacionIn, IActualizarUbicacionIn } from '../usecase/dto/in/IUbicacionesIn';

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
        const crearData: ICrearUbicacionIn = {
            nombre: 'Ubicación para Actualizar',
            direccion: 'Dirección inicial',
            latitud: 40.4168,
            longitud: -3.7038,
        };
        const crearRequest: Req = { body: crearData, params: {}, data: {} };
        const crearResponse: Response<any> = await ubicacionesController.crearUbicacion(crearRequest);
        const idUbicacion = crearResponse.response.data?.data.id_ubicacion;

        // Ahora, actualizamos la ubicación
        const actualizarData: IActualizarUbicacionIn = {
            id_ubicacion: idUbicacion,
            nombre: 'Ubicación Actualizada',
            direccion: 'Nueva dirección',
            latitud: 40.42,
            longitud: -3.71,
        };
        const actualizarRequest: Req = { body: actualizarData, params: {}, data: {} };
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
