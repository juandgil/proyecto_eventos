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

let db: ReturnType<typeof mockConfiguracionesDB>;
let ubicacionesController: UbicacionesController;

beforeAll(async () => {
    createDependencies();
    db = mockConfiguracionesDB();

    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPESDEPENDENCIESGLOBAL.db).toConstantValue(db);

    ubicacionesController = new UbicacionesController();
});

describe('Listar Ubicaciones', () => {
    it('Debe listar las ubicaciones correctamente', async () => {
        // Primero, creamos algunas ubicaciones
        const ubicaciones = [
            { nombre: 'Ubicación 1', direccion: 'Dirección 1' },
            { nombre: 'Ubicación 2', direccion: 'Dirección 2' },
            { nombre: 'Ubicación 3', direccion: 'Dirección 3' },
        ];

        for (const ubicacion of ubicaciones) {
            await ubicacionesController.crearUbicacion({ body: ubicacion, params: {}, data: {} });
        }

        // Ahora, listamos las ubicaciones
        const listarResponse: Response<any> = await ubicacionesController.listarUbicaciones();
        expect(listarResponse.status).toBe(200);
        expect(listarResponse.response.data?.ok).toBe('Ubicaciones listadas exitosamente');
        expect(Array.isArray(listarResponse.response.data?.data)).toBe(true);
        expect(listarResponse.response.data?.data.length).toBeGreaterThanOrEqual(ubicaciones.length);

        // Verificamos que las ubicaciones creadas estén en la lista
        for (const ubicacion of ubicaciones) {
            const ubicacionEncontrada = listarResponse.response.data?.data.find(
                (u: any) => u.nombre === ubicacion.nombre && u.direccion === ubicacion.direccion,
            );
            expect(ubicacionEncontrada).toBeDefined();
        }
    });
});
