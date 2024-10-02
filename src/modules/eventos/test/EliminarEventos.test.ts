import 'reflect-metadata';
import { mockConfiguracionesDB } from './mocks/postgresql/crear-pg-mem';
import EventosController from '../controllers/EventosController';
import { Req } from '@modules/shared/infrastructure';
import { Response } from '@common/http/Response';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import createDependencies from '../dependencies/Dependencies';
import { IDatabase, IMain } from 'pg-promise';
import TYPESDEPENDENCIESGLOBAL from '@common/dependencies/TypesDependencies';
import { beforeAll, describe, expect, it } from '@jest/globals';
import NotFoundException from '@common/http/exceptions/NotFoundException';
import limpiarBaseDeDatos from '@common/util/testUtils';
import { ICrearEventoIn } from '../usecase/dto/in/IEventosIn';

let db: ReturnType<typeof mockConfiguracionesDB>;
let eventosController: EventosController;

beforeAll(async () => {
    createDependencies();
    db = mockConfiguracionesDB();

    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPESDEPENDENCIESGLOBAL.db).toConstantValue(db);

    eventosController = new EventosController();
});

describe('Eliminar Evento', () => {
    beforeEach(async () => {
        await limpiarBaseDeDatos();
    });

    it('Debe eliminar un evento correctamente', async () => {
        const crearData: ICrearEventoIn = {
            titulo: 'Evento para Eliminar',
            descripcion: 'Descripción de prueba',
            fecha_inicio: new Date(),
            fecha_fin: new Date(),
            id_creador: 1,
            id_ubicacion: 1,
            id_categoria: 1,
        };
        const crearRequest: Req = { body: crearData, params: {}, data: {} };
        const eventoCreado = await eventosController.crearEvento(crearRequest);
        const idEvento = (eventoCreado.response.data as any).data.id_evento;

        const eliminarRequest: Req = {
            body: {},
            params: { id: idEvento },
            data: {},
        };
        const resultado = await eventosController.eliminarEvento(eliminarRequest);
        expect(resultado.status).toBe(200);
        expect(resultado.response.data?.ok).toBe('Evento eliminado exitosamente');
    });

    it('Debe fallar al eliminar un evento inexistente', async () => {
        const request: Req = {
            body: {},
            params: { id: '9999' },
            data: {},
        };
        await expect(eventosController.eliminarEvento(request)).rejects.toThrow(NotFoundException);
    });
});
