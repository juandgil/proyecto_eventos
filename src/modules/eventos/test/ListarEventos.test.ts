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
import { ICrearEventoIn } from '../usecase/dto/in/IEventosIn';

let db: ReturnType<typeof mockConfiguracionesDB>;
let eventosController: EventosController;

beforeAll(async () => {
    createDependencies();
    db = mockConfiguracionesDB();

    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPESDEPENDENCIESGLOBAL.db).toConstantValue(db);

    eventosController = new EventosController();
});

describe('Listar Eventos', () => {
    it('Debe listar los eventos correctamente', async () => {
        const eventos: ICrearEventoIn[] = [
            { titulo: 'Evento 1', descripcion: 'Descripción 1', fecha_inicio: new Date(), fecha_fin: new Date(), id_creador: 1, id_ubicacion: 1, id_categoria: 1 },
            { titulo: 'Evento 2', descripcion: 'Descripción 2', fecha_inicio: new Date(), fecha_fin: new Date(), id_creador: 1, id_ubicacion: 1, id_categoria: 1 },
            { titulo: 'Evento 3', descripcion: 'Descripción 3', fecha_inicio: new Date(), fecha_fin: new Date(), id_creador: 1, id_ubicacion: 2, id_categoria: 2 },
        ];

        for (const evento of eventos) {
            await eventosController.crearEvento({ body: evento, params: {}, data: {} });
        }

        const listarRequest: Req = { body: {}, params: {}, data: {} };
        const listarResponse: Response<any> = await eventosController.listarEventos(listarRequest);
        expect(listarResponse.status).toBe(200);
        expect(listarResponse.response.data?.ok).toBe('Eventos listados exitosamente');
        expect(Array.isArray(listarResponse.response.data?.data)).toBe(true);
        expect(listarResponse.response.data?.data.length).toBeGreaterThanOrEqual(eventos.length);

        for (const evento of eventos) {
            const eventoEncontrado = listarResponse.response.data?.data.find(
                (e: any) => e.titulo === evento.titulo && e.descripcion === evento.descripcion,
            );
            expect(eventoEncontrado).toBeDefined();
        }
    });
});
