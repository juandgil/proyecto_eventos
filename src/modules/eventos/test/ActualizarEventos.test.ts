import 'reflect-metadata';
import { mockConfiguracionesDB } from './mocks/postgresql/crear-pg-mem';
import EventosController from '../controllers/EventosController';
import { Req } from '@modules/shared/infrastructure';
import { Response } from '@common/http/Response';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import createDependencies from '../dependencies/Dependencies';
import { IDatabase, IMain } from 'pg-promise';
import TYPESDEPENDENCIESGLOBAL from '@common/dependencies/TypesDependencies';
import { beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import limpiarBaseDeDatos from '../../../common/util/testUtils';
import { ICrearEventoIn, IActualizarEventoIn } from '../usecase/dto/in/IEventosIn';

let db: ReturnType<typeof mockConfiguracionesDB>;
let eventosController: EventosController;

beforeAll(async () => {
    createDependencies();
    db = mockConfiguracionesDB();

    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPESDEPENDENCIESGLOBAL.db).toConstantValue(db);

    eventosController = new EventosController();
});

beforeEach(async () => {
    await limpiarBaseDeDatos();
});

describe('Actualizar Evento', () => {
    it('Debe actualizar un evento correctamente', async () => {
        const crearData: ICrearEventoIn = {
            titulo: 'Evento para Actualizar',
            descripcion: 'Descripción inicial',
            fecha_inicio: new Date(),
            fecha_fin: new Date(),
            id_creador: 1, // Asume que existe un usuario con este ID
            id_ubicacion: 1,
            id_categoria: 1, // Asume que existe una categoría con este ID
        };
        const crearRequest: Req = { body: crearData, params: {}, data: {} };
        const crearResponse: Response<any> = await eventosController.crearEvento(crearRequest);
        const idEvento = crearResponse.response.data?.data.id_evento;

        const actualizarData: IActualizarEventoIn = {
            id_evento: idEvento,
            titulo: 'Evento Actualizado',
            descripcion: 'Nueva descripción',
            fecha_inicio: new Date(),
            fecha_fin: new Date(),
            id_creador: 1,
            id_ubicacion: 2,
            id_categoria: 2,
        };
        const actualizarRequest: Req = { body: actualizarData, params: {}, data: {} };
        const actualizarResponse: Response<any> = await eventosController.actualizarEvento(actualizarRequest);
        expect(actualizarResponse.status).toBe(200);
        expect(actualizarResponse.response.data?.ok).toBe('Evento actualizado exitosamente');
        expect(actualizarResponse.response.data?.data.titulo).toBe('Evento Actualizado');
        expect(actualizarResponse.response.data?.data.descripcion).toBe('Nueva descripción');
    });

    it('Debe fallar al actualizar un evento inexistente', async () => {
        const request: Req = {
            body: { id_evento: 9999, nombre: 'Evento Inexistente', descripcion: 'Descripción inexistente' },
            params: {},
            data: {},
        };
        await expect(eventosController.actualizarEvento(request)).rejects.toThrow();
    });
});
