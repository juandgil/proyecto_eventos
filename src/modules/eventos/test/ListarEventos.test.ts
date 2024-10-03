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
import { ICrearEventoIn } from '../usecase/dto/in/IEventosIn';
import limpiarBaseDeDatos from '@common/util/testUtils';

let db: ReturnType<typeof mockConfiguracionesDB>;
let eventosController: EventosController;

beforeAll(async () => {
    createDependencies();
    db = mockConfiguracionesDB();

    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPESDEPENDENCIESGLOBAL.db).toConstantValue(db);

    eventosController = new EventosController();
});

describe('Listar Eventos', () => {
    beforeEach(async () => {
        await limpiarBaseDeDatos();

        // Función auxiliar para insertar si no existe
        const insertIfNotExists = async (table: string, idColumnName: string, data: any) => {
            const existingRecord = await db.oneOrNone(
                `SELECT * FROM ${table} WHERE ${idColumnName} = $1`,
                data[idColumnName],
            );

            if (!existingRecord) {
                const columns = Object.keys(data).join(', ');
                const values = Object.values(data);
                const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
                await db.none(`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`, values);
            }
        };

        // Insertar categorías
        await insertIfNotExists('categorias_eventos', 'id_categoria', {
            id_categoria: 1,
            nombre: 'Categoría de prueba 1',
        });
        await insertIfNotExists('categorias_eventos', 'id_categoria', {
            id_categoria: 2,
            nombre: 'Categoría de prueba 2',
        });

        // Insertar ubicaciones
        await insertIfNotExists('ubicaciones', 'id_ubicacion', {
            id_ubicacion: 1,
            nombre: 'Ubicación de prueba 1',
            direccion: 'Dirección 1',
            latitud: 0,
            longitud: 0,
        });
        await insertIfNotExists('ubicaciones', 'id_ubicacion', {
            id_ubicacion: 2,
            nombre: 'Ubicación de prueba 2',
            direccion: 'Dirección 2',
            latitud: 0,
            longitud: 0,
        });

        // Insertar usuario
        await insertIfNotExists('usuarios', 'id_usuario', {
            id_usuario: 1,
            nombre_usuario: 'usuario_test',
            correo: 'test@example.com',
            hash_contrasena: 'hash_password',
            id_perfil: 1,
        });
    });

    it('Debe listar los eventos correctamente', async () => {
        const eventos: ICrearEventoIn[] = [
            {
                titulo: 'Evento 1',
                descripcion: 'Descripción 1',
                fecha_inicio: new Date('2023-06-01T10:00:00Z'),
                fecha_fin: new Date('2023-06-01T12:00:00Z'),
                id_creador: 1,
                id_ubicacion: 1,
                id_categoria: 1,
            },
            {
                titulo: 'Evento 2',
                descripcion: 'Descripción 2',
                fecha_inicio: new Date('2023-06-02T10:00:00Z'),
                fecha_fin: new Date('2023-06-02T12:00:00Z'),
                id_creador: 1,
                id_ubicacion: 1,
                id_categoria: 1,
            },
            {
                titulo: 'Evento 3',
                descripcion: 'Descripción 3',
                fecha_inicio: new Date('2023-06-03T10:00:00Z'),
                fecha_fin: new Date('2023-06-03T12:00:00Z'),
                id_creador: 1,
                id_ubicacion: 2,
                id_categoria: 2,
            },
        ];

        for (const evento of eventos) {
            await eventosController.crearEvento({ body: evento, params: {}, data: {} });
        }

        const listarRequest: Req = { body: {}, params: {}, data: {} };
        const listarResponse: Response<any> = await eventosController.listarEventos(listarRequest);

        console.log('Respuesta de listarEventos:', JSON.stringify(listarResponse, null, 2));

        expect(listarResponse.status).toBe(200);
        expect(listarResponse.response.data?.ok).toBe('Eventos listados exitosamente');
        expect(listarResponse.response.data?.data).toBeDefined();
        expect(Array.isArray(listarResponse.response.data?.data.eventos)).toBe(true);
        expect(listarResponse.response.data?.data.eventos.length).toBeGreaterThanOrEqual(eventos.length);

        for (const evento of eventos) {
            const eventoEncontrado = listarResponse.response.data?.data.eventos.find(
                (e: any) => e.titulo === evento.titulo && e.descripcion === evento.descripcion,
            );
            expect(eventoEncontrado).toBeDefined();
        }

        expect(listarResponse.response.data?.data.paginacion).toBeDefined();
        expect(listarResponse.response.data?.data.paginacion.paginaActual).toBe(1);
        expect(listarResponse.response.data?.data.paginacion.totalEventos).toBeGreaterThanOrEqual(eventos.length);
    });
});
