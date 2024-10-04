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
import limpiarBaseDeDatos from '@common/util/testUtils';
import { ICrearEventoIn } from '../usecase/dto/in/IEventosIn';

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

describe('Crear Evento', () => {
    beforeEach(async () => {
        await limpiarBaseDeDatos();
    });

    it('Debe crear un evento correctamente', async () => {
        const data: ICrearEventoIn = {
            titulo: 'Evento Test',
            descripcion: 'Descripción Test',
            fecha_inicio: new Date('2023-06-01T10:00:00Z'),
            fecha_fin: new Date('2023-06-01T12:00:00Z'),
            id_creador: 1,
            id_ubicacion: 1,
            id_categoria: 1,
        };
        const request: Req = { body: data, params: {}, data: {}, file: {} };
        const response: Response<any> = await eventosController.crearEvento(request);
        expect(response.status).toBe(200);
        expect(response.response.data?.ok).toBe('Evento creado exitosamente');
        expect(response.response.data?.data).toHaveProperty('id_evento');
        expect(response.response.data?.data.titulo).toBe('Evento Test');
        expect(response.response.data?.data.descripcion).toBe('Descripción Test');
    });

    it('Debe fallar al crear un evento con nombre duplicado', async () => {
        const data: ICrearEventoIn = {
            titulo: 'Evento Test Duplicado',
            descripcion: 'Descripción Test',
            fecha_inicio: new Date('2023-06-01T10:00:00Z'),
            fecha_fin: new Date('2023-06-01T12:00:00Z'),
            id_creador: 1,
            id_ubicacion: 1,
            id_categoria: 1,
        };
        const request: Req = { body: data, params: {}, data: {}, file: {} };
        await eventosController.crearEvento(request);

        try {
            await eventosController.crearEvento(request);
            fail('Se esperaba que la creación del evento duplicado fallara');
        } catch (error) {
            expect(error).toHaveProperty('statusCode', 400);
            expect(error).toHaveProperty('message', 'Ya existe un evento con el mismo título');
        }
    });
});
