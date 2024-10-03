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

    // Verificar que la base de datos se ha inicializado correctamente
    const categorias = await db.query('SELECT * FROM public.categorias_eventos');
    console.log('Categorías en la base de datos:', categorias);

    if (categorias.length === 0) {
        throw new Error('La tabla de categorías está vacía. La base de datos no se ha inicializado correctamente.');
    }
});

describe('Eliminar Evento', () => {
    beforeEach(async () => {
        await limpiarBaseDeDatos();
    });

    it('Debe eliminar un evento correctamente', async () => {
        const fechaFutura = new Date();
        fechaFutura.setDate(fechaFutura.getDate() + 1); // Establece la fecha para mañana

        const eventoMock = {
            titulo: 'Evento para Eliminar',
            descripcion: 'Descripción de prueba',
            fecha_inicio: new Date('2023-06-01T10:00:00Z'),
            fecha_fin: fechaFutura,
            id_creador: 1,
            id_ubicacion: 1,
            id_categoria: 1,
        };

        const crearRequest: Req = { body: eventoMock, params: {}, data: {} };
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
