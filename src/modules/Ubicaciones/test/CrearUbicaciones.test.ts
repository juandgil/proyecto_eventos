import 'reflect-metadata';
import { mockConfiguracionesDB } from './mocks/postgresql/crear-pg-mem';
import UbicacionesController from '../controllers/UbicacionesController';
import { Req } from '@modules/shared/infrastructure';
import { Response } from '@common/http/Response';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import createDependencies from '../dependencies/Dependencies';
import { IDatabase, IMain } from 'pg-promise';
import TYPESDEPENDENCIESGLOBAL from '@common/dependencies/TypesDependencies';
import { beforeAll, describe, expect, it } from '@jest/globals';
import limpiarBaseDeDatos from '@common/util/testUtils';
import { ICrearUbicacionIn } from '../usecase/dto/in/IUbicacionesIn';

let db: ReturnType<typeof mockConfiguracionesDB>;
let ubicacionesController: UbicacionesController;

beforeAll(async () => {
    createDependencies();
    db = mockConfiguracionesDB();

    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPESDEPENDENCIESGLOBAL.db).toConstantValue(db);

    ubicacionesController = new UbicacionesController();
});

describe('Crear Ubicacion', () => {
    beforeEach(async () => {
        await limpiarBaseDeDatos();
    });

    it('Debe crear una ubicación correctamente', async () => {
        const data: ICrearUbicacionIn = {
            nombre: 'Ubicación Test',
            direccion: 'Dirección Test',
            latitud: 40.4168,
            longitud: -3.7038,
        };
        const request: Req = { body: data, params: {}, data: {} };
        const response: Response<any> = await ubicacionesController.crearUbicacion(request);
        expect(response.status).toBe(200);
        expect(response.response.data?.ok).toBe('Ubicación creada exitosamente');
        expect(response.response.data?.data).toHaveProperty('id_ubicacion');
        expect(response.response.data?.data.nombre).toBe('Ubicación Test');
        expect(response.response.data?.data.direccion).toBe('Dirección Test');
    });

    it('Debe fallar al crear una ubicación con nombre duplicado', async () => {
        // Primero, creamos una ubicación
        const data: ICrearUbicacionIn = {
            nombre: 'Ubicación Test33',
            direccion: 'Otra dirección',
            latitud: 40.4169,
            longitud: -3.7039,
        };
        const request: Req = { body: data, params: {}, data: {} };
        await ubicacionesController.crearUbicacion(request);

        // Intentamos crear otra ubicación con el mismo nombre
        const data2: ICrearUbicacionIn = {
            nombre: 'Ubicación Test33',
            direccion: 'Otra dirección',
            latitud: 40.4169,
            longitud: -3.7039,
        };
        const request2: Req = { body: data2, params: {}, data: {} };

        try {
            await ubicacionesController.crearUbicacion(request2);
            fail('Se esperaba que la creación de la ubicación duplicada fallara');
        } catch (error) {
            expect(error).toHaveProperty('statusCode', 400);
            expect(error).toHaveProperty('message', 'Ya existe una ubicación con el mismo nombre');
            expect(error).toHaveProperty('cause', 'Ubicación ya existe');
        }
    });
});
