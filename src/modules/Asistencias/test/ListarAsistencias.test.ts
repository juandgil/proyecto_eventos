import 'reflect-metadata';
import { mockConfiguracionesDB } from './mocks/postgresql/crear-pg-mem';
import AsistenciasController from '../controllers/AsistenciasController';
import { Req } from '@modules/shared/infrastructure';
import { Response } from '@common/http/Response';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import createDependencies from '../dependencies/Dependencies';
import { IDatabase, IMain } from 'pg-promise';
import TYPESDEPENDENCIESGLOBAL from '@common/dependencies/TypesDependencies';
import { beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import limpiarBaseDeDatos from '@common/util/testUtils';

let db: ReturnType<typeof mockConfiguracionesDB>;
let asistenciasController: AsistenciasController;

beforeAll(async () => {
    createDependencies();
    db = mockConfiguracionesDB();

    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPESDEPENDENCIESGLOBAL.db).toConstantValue(db);

    asistenciasController = new AsistenciasController();
});

describe('Listar Asistencias', () => {
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

        // Insertar ubicaciones
        await insertIfNotExists('ubicaciones', 'id_ubicacion', {
            id_ubicacion: 1,
            nombre: 'Ubicación de prueba 1',
            direccion: 'Dirección 1',
            latitud: 0,
            longitud: 0,
        });

        // Insertar usuarios
        await insertIfNotExists('usuarios', 'id_usuario', {
            id_usuario: 1,
            nombre_usuario: 'usuario_test_1',
            correo: 'test1@example.com',
            hash_contrasena: 'hash_password',
            id_perfil: 1,
        });
        await insertIfNotExists('usuarios', 'id_usuario', {
            id_usuario: 2,
            nombre_usuario: 'usuario_test_2',
            correo: 'test2@example.com',
            hash_contrasena: 'hash_password',
            id_perfil: 1,
        });

        // Insertar eventos
        await insertIfNotExists('eventos', 'id_evento', {
            id_evento: 1,
            titulo: 'Evento de prueba 1',
            descripcion: 'Descripción del evento 1',
            fecha_inicio: new Date('2023-06-01T10:00:00Z'),
            fecha_fin: new Date('2023-06-01T12:00:00Z'),
            id_creador: 1,
            id_ubicacion: 1,
            id_categoria: 1,
        });
        await insertIfNotExists('eventos', 'id_evento', {
            id_evento: 2,
            titulo: 'Evento de prueba 2',
            descripcion: 'Descripción del evento 2',
            fecha_inicio: new Date('2023-06-02T10:00:00Z'),
            fecha_fin: new Date('2023-06-02T12:00:00Z'),
            id_creador: 1,
            id_ubicacion: 1,
            id_categoria: 1,
        });

        // Insertar asistencias
        await insertIfNotExists('asistencias', 'id_asistencia', {
            id_asistencia: 1,
            id_usuario: 1,
            id_evento: 1,
            creado_en: new Date(),
        });
        await insertIfNotExists('asistencias', 'id_asistencia', {
            id_asistencia: 2,
            id_usuario: 1,
            id_evento: 2,
            creado_en: new Date(),
        });
        await insertIfNotExists('asistencias', 'id_asistencia', {
            id_asistencia: 3,
            id_usuario: 2,
            id_evento: 1,
            creado_en: new Date(),
        });
    });

    it('Debe listar las asistencias correctamente', async () => {
        const listarRequest: Req = { body: {}, params: {}, data: {} };
        const listarResponse: Response<any> = await asistenciasController.listarAsistencias(listarRequest);

        console.log('Respuesta de listarAsistencias:', JSON.stringify(listarResponse, null, 2));

        expect(listarResponse.status).toBe(200);
        expect(listarResponse.response.data?.ok).toBe('Asistencias listadas exitosamente');
        expect(listarResponse.response.data?.data).toBeDefined();
        expect(Array.isArray(listarResponse.response.data?.data.asistencias)).toBe(true);
        expect(listarResponse.response.data?.data.asistencias.length).toBe(3);

        expect(listarResponse.response.data?.data.paginacion).toBeDefined();
        expect(listarResponse.response.data?.data.paginacion.paginaActual).toBe(1);
        expect(listarResponse.response.data?.data.paginacion.totalAsistencias).toBe(3);
    });
});
