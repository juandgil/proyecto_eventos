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
import limpiarBaseDeDatos from './mocks/postgresql/testUtils';

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
        const request: Req = {
            body: { nombre: 'Ubicación Test', direccion: 'Dirección Test' },
            params: {},
            data: {},
        };
        const response: Response<any> = await ubicacionesController.crearUbicacion(request);
        expect(response.status).toBe(200);
        expect(response.response.data?.ok).toBe('Ubicación creada exitosamente');
        expect(response.response.data?.data).toHaveProperty('id_ubicacion');
        expect(response.response.data?.data.nombre).toBe('Ubicación Test');
        expect(response.response.data?.data.direccion).toBe('Dirección Test');
    });

    it('Debe fallar al crear una ubicación con nombre duplicado', async () => {
        // Primero, creamos una ubicación
        await ubicacionesController.crearUbicacion({
            body: { nombre: 'Ubicación Test', direccion: 'Dirección de prueba' },
        } as Req);

        // Luego, intentamos crear otra con el mismo nombre
        await expect(async () => {
            await ubicacionesController.crearUbicacion({
                body: { nombre: 'Ubicación Test', direccion: 'Otra dirección' },
            } as Req);
        }).rejects.toThrow('Ya existe una ubicación con el mismo nombre');
    });
});
