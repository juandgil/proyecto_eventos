import 'reflect-metadata';
import NotFoundException from '@common/http/exceptions/NotFoundException';
import { mockConfiguracionesDB } from './mocks/postgresql/crear-pg-mem';
import EventosController from '../controllers/EventosController';
import { Req } from '@modules/shared/infrastructure';
import { Response } from '@common/http/Response';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import createDependencies from '../dependencies/Dependencies';
import { IDatabase, IMain } from 'pg-promise';
import TYPESDEPENDENCIESGLOBAL from '@common/dependencies/TypesDependencies';
import { beforeAll, describe, expect, it } from '@jest/globals';
import { ICrearEventoIn } from '../usecase/dto/in/IEventosIn';
import limpiarBaseDeDatos from '@common/util/testUtils';

let db: ReturnType<typeof mockConfiguracionesDB>;
let eventosController: EventosController;

beforeAll(async () => {
    createDependencies();
    db = mockConfiguracionesDB();

    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPESDEPENDENCIESGLOBAL.db).toConstantValue(db);

    eventosController = new EventosController();

    // Verificar que la base de datos se ha inicializado correctamente
    const categorias = await db.query('SELECT * FROM public.categorias_eventos');
    console.log('Categorías en la base de datos:', categorias);

    if (categorias.length === 0) {
        throw new Error('La tabla de categorías está vacía. La base de datos no se ha inicializado correctamente.');
    }
});
beforeEach(async () => {
    await limpiarBaseDeDatos();
});
describe('Consultar Evento', () => {
    it('Debe consultar un evento correctamente', async () => {
        const crearData: ICrearEventoIn = {
            titulo: 'Evento para Consultar',
            descripcion: 'Descripción de prueba',
            fecha_inicio: new Date('2023-06-01T10:00:00Z'),
            fecha_fin: new Date('2023-06-01T12:00:00Z'),
            id_creador: 1,
            id_ubicacion: 1,
            id_categoria: 1,
        };
        const crearRequest: Req = { body: crearData, params: {}, data: {} };
        const crearResponse: Response<any> = await eventosController.crearEvento(crearRequest);
        const idEvento = crearResponse.response.data?.data.id_evento;

        const consultarRequest: Req = {
            body: {},
            params: { id: idEvento },
            data: {},
        };
        const consultarResponse: Response<any> = await eventosController.consultarEvento(consultarRequest);
        expect(consultarResponse.status).toBe(200);
        expect(consultarResponse.response.data?.ok).toBe('Evento consultado exitosamente');
        expect(consultarResponse.response.data?.data.id_evento).toBe(idEvento);
        expect(consultarResponse.response.data?.data.titulo).toBe('Evento para Consultar');
        expect(consultarResponse.response.data?.data.descripcion).toBe('Descripción de prueba');
    });

    it('Debe fallar al consultar un evento inexistente', async () => {
        const request: Req = {
            body: {},
            params: { id: '9999' },
            data: {},
        };
        await expect(eventosController.consultarEvento(request)).rejects.toThrow(NotFoundException);
    });
});
