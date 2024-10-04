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
import { ICrearAsistenciaIn } from '../usecase/dto/in/IAsistenciasIn';
import limpiarBaseDeDatos from '@common/util/testUtils';
import NotFoundException from '@common/http/exceptions/NotFoundException';

let db: ReturnType<typeof mockConfiguracionesDB>;
let asistenciasController: AsistenciasController;

beforeAll(async () => {
    createDependencies();
    db = mockConfiguracionesDB();

    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPESDEPENDENCIESGLOBAL.db).toConstantValue(db);

    asistenciasController = new AsistenciasController();
});

describe('Consultar Asistencia', () => {
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

        // Insertar usuario
        await insertIfNotExists('usuarios', 'id_usuario', {
            id_usuario: 1,
            nombre_usuario: 'usuario_test',
            correo: 'test@example.com',
            hash_contrasena: 'hash_password',
            id_perfil: 1,
        });

        // Insertar evento
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

        // Insertar asistencia
        await insertIfNotExists('asistencias', 'id_asistencia', {
            id_asistencia: 1,
            id_usuario: 1,
            id_evento: 1,
            creado_en: new Date(),
        });
    });

    it('Debe consultar una asistencia correctamente', async () => {
        const consultarRequest: Req = {
            body: {},
            params: { id: '1' },
            data: {},
            file: {},
        };
        const consultarResponse: Response<any> = await asistenciasController.consultarAsistencia(consultarRequest);

        console.log('Respuesta de consultarAsistencia:', JSON.stringify(consultarResponse, null, 2));

        expect(consultarResponse.status).toBe(200);
        expect(consultarResponse.response.data?.ok).toBe('Asistencia consultada exitosamente');
        expect(consultarResponse.response.data?.data.id_asistencia).toBe(1);
        expect(consultarResponse.response.data?.data.usuario.id_usuario).toBe(1);
        expect(consultarResponse.response.data?.data.evento.id_evento).toBe(1);
    });

    it('Debe fallar al consultar una asistencia inexistente', async () => {
        const request: Req = {
            body: {},
            params: { id: '9999' },
            data: {},
            file: {},
        };
        await expect(asistenciasController.consultarAsistencia(request)).rejects.toThrow(NotFoundException);
    });
});
