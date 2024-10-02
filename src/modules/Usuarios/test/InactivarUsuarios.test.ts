import 'reflect-metadata';
import { mockConfiguracionesDB } from './mocks/postgresql/crear-pg-mem';
import UsuariosController from '../controllers/UsuariosController';
import { Req } from '@modules/shared/infrastructure';
import { Response } from '@common/http/Response';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import createDependencies from '../dependencies/Dependencies';
import { IDatabase, IMain } from 'pg-promise';
import TYPESDEPENDENCIESPERFILES from '@modules/Perfiles/dependencies/TypesDependencies';
import { PerfilesRepository } from '@modules/Perfiles/domain/repositories/PerfilesRepository';
import PostgresPerfilesRepository from '@infrastructure/bd/dao/PostgresPerfilesRepository';
import TYPESDEPENDENCIESGLOBAL from '@common/dependencies/TypesDependencies';
import BadMessageException from '@common/http/exceptions/BadMessageException';
import { beforeAll, describe, expect, it } from '@jest/globals';

let db: ReturnType<typeof mockConfiguracionesDB>;
let usuariosController: UsuariosController;

beforeAll(async () => {
    createDependencies();
    db = mockConfiguracionesDB();

    DEPENDENCY_CONTAINER.bind<PerfilesRepository>(TYPESDEPENDENCIESPERFILES.PerfilesRepository)
        .to(PostgresPerfilesRepository)
        .inSingletonScope();

    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPESDEPENDENCIESGLOBAL.db).toConstantValue(db);

    usuariosController = new UsuariosController();
});

describe('InactivarUsuarios', () => {
    it('Inactivar usuario existente correctamente', async () => {
        const idUsuario = 1; // Asumiendo que este usuario existe en la base de datos de prueba
        const request: Req = { params: { id: idUsuario }, body: {}, data: {} };
        const response: Response<any> = await usuariosController.inactivarUsuario(request);
        expect(response.status).toBe(200);
        expect(response.response.data?.ok).toBe('Usuario inactivado exitosamente');
    });

    it('No inactivar usuario inexistente', async () => {
        const idUsuario = 9999; // Un ID que no debería existir
        const request: Req = { params: { id: idUsuario }, body: {}, data: {} };
        await expect(usuariosController.inactivarUsuario(request)).rejects.toThrow(BadMessageException);
    });

    it('Manejar error con ID de usuario inválido', async () => {
        const request: Req = { params: { id: 'no-es-un-numero' }, body: {}, data: {} };
        await expect(usuariosController.inactivarUsuario(request)).rejects.toThrow(BadMessageException);
    });

    it('No permitir inactivar un usuario ya inactivo', async () => {
        const idUsuario = 2; // Asumiendo que este usuario existe inicialmente
        const request: Req = { params: { id: idUsuario }, body: {}, data: {} };
        await usuariosController.inactivarUsuario(request);

        // Intentar inactivar el mismo usuario nuevamente debería fallar
        await expect(usuariosController.inactivarUsuario(request)).rejects.toThrow(BadMessageException);
    });
});
