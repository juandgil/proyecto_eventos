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
import NotFoundException from '@common/http/exceptions/NotFoundException';
import limpiarBaseDeDatos  from '@common/util/testUtils';
import { ICrearUbicacionIn } from '../usecase/dto/in/IUbicacionesIn';

let db: ReturnType<typeof mockConfiguracionesDB>;
let ubicacionesController: UbicacionesController;

beforeAll(async () => {
    createDependencies();
    db = mockConfiguracionesDB();

    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPESDEPENDENCIESGLOBAL.db).toConstantValue(db);

    ubicacionesController = new UbicacionesController();
});

describe('Eliminar Ubicacion', () => {
    beforeEach(async () => {
        await limpiarBaseDeDatos();
    });

    it('Debe eliminar una ubicación correctamente', async () => {
        // Primero, creamos una ubicación
        const crearData: ICrearUbicacionIn = {
            nombre: 'Ubicación para Eliminar',
            direccion: 'Dirección de prueba',
            latitud: 40.4168,
            longitud: -3.7038,
        };
        const crearRequest: Req = { body: crearData, params: {}, data: {} };
        const ubicacionCreada = await ubicacionesController.crearUbicacion(crearRequest);
        const idUbicacion = (ubicacionCreada.response.data as any).data.id_ubicacion;

        // Ahora eliminar la ubicación
        const eliminarRequest: Req = {
            body: {},
            params: { id: idUbicacion },
            data: {},
        };
        const resultado = await ubicacionesController.eliminarUbicacion(eliminarRequest);
        expect(resultado.status).toBe(200);
        expect(resultado.response.data?.ok).toBe('Ubicación eliminada exitosamente');
    });

    it('Debe fallar al eliminar una ubicación inexistente', async () => {
        const request: Req = {
            body: {},
            params: { id: '9999' },
            data: {},
        };
        await expect(ubicacionesController.eliminarUbicacion(request)).rejects.toThrow(NotFoundException);
    });
});
