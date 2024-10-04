import 'reflect-metadata';
import NotFoundException from '@common/http/exceptions/NotFoundException';
import { mockConfiguracionesDB } from './mocks/postgresql/crear-pg-mem';
import UbicacionesController from '../controllers/UbicacionesController';
import { Req } from '@modules/shared/infrastructure';
import { Response } from '@common/http/Response';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import createDependencies from '../dependencies/Dependencies';
import { IDatabase, IMain } from 'pg-promise';
import TYPESDEPENDENCIESGLOBAL from '@common/dependencies/TypesDependencies';
import { beforeAll, describe, expect, it } from '@jest/globals';
import { ICrearUbicacionIn } from '../usecase/dto/in/IUbicacionesIn';

let db: ReturnType<typeof mockConfiguracionesDB>;
let ubicacionesController: UbicacionesController;

beforeAll(async () => {
    createDependencies();
    db = mockConfiguracionesDB();

    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPESDEPENDENCIESGLOBAL.db).toConstantValue(db);

    ubicacionesController = new UbicacionesController();
});

describe('Consultar Ubicacion', () => {
    it('Debe consultar una ubicación correctamente', async () => {
        // Primero, creamos una ubicación
        const crearData: ICrearUbicacionIn = {
            nombre: 'Ubicación para Consultar',
            direccion: 'Dirección de prueba',
            latitud: 40.4168,
            longitud: -3.7038,
        };
        const crearRequest: Req = { body: crearData, params: {}, data: {}, file: {} };
        const crearResponse: Response<any> = await ubicacionesController.crearUbicacion(crearRequest);
        const idUbicacion = crearResponse.response.data?.data.id_ubicacion;

        // Ahora, consultamos la ubicación
        const consultarRequest: Req = {
            body: {},
            params: { id: idUbicacion },
            data: {},
            file: {},
        };
        const consultarResponse: Response<any> = await ubicacionesController.consultarUbicacion(consultarRequest);
        expect(consultarResponse.status).toBe(200);
        expect(consultarResponse.response.data?.ok).toBe('Ubicación consultada exitosamente');
        expect(consultarResponse.response.data?.data.id_ubicacion).toBe(idUbicacion);
        expect(consultarResponse.response.data?.data.nombre).toBe('Ubicación para Consultar');
        expect(consultarResponse.response.data?.data.direccion).toBe('Dirección de prueba');
    });

    it('Debe fallar al consultar una ubicación inexistente', async () => {
        const request: Req = {
            body: {},
            params: { id: '9999' },
            data: {},
            file: {},
        };
        await expect(ubicacionesController.consultarUbicacion(request)).rejects.toThrow(NotFoundException);
    });
});
