import 'reflect-metadata';
import { Req, Status } from '@modules/shared/infrastructure';
import { Response } from '@common/http/Response';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import { IDatabase, IMain } from 'pg-promise';
import TYPESDEPENDENCIESPERFILES from '@modules/Perfiles/dependencies/TypesDependencies';
import { PerfilesRepository } from '@modules/Perfiles/domain/repositories/PerfilesRepository';
import PostgresPerfilesRepository from '@infrastructure/bd/dao/PostgresPerfilesRepository';
import TYPESDEPENDENCIESGLOBAL from '@common/dependencies/TypesDependencies';
import BadMessageException from '@common/http/exceptions/BadMessageException';
import createDependencies from '../dependencies/Dependencies';
import UsuariosController from '../controllers/UsuariosController';
import { mockConfiguracionesDB } from './mocks/postgresql/crear-pg-mem';
import { IAsociarPerfilIn } from '../usecase/dto/in/IAsociarPerfilIn';
import { test, expect , beforeAll } from '@jest/globals';

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

test('Validar que el perfil exista', async () => {
    const data: IAsociarPerfilIn = {
        perfil: 2,
        id_usuario: 1,
    };

    const request: Req = { body: data, params: { idUsuario: 1 }, data: {} };

    try {
        await usuariosController.asociarPerfil(request);
        expect(true).toBe(false);
    } catch (error) {
        expect(error).toBeInstanceOf(BadMessageException);
        expect(error.statusCode).toBe(400);
    }
});

test('Validar que el usuario exista', async () => {
    const data: IAsociarPerfilIn = {
        perfil: 1,
        id_usuario: 2,
    };

    const request: Req = { body: data, params: { idUsuario: 2 }, data: {} };

    try {
        await usuariosController.asociarPerfil(request);
        expect(true).toBe(false);
    } catch (error) {
        expect(error).toBeInstanceOf(BadMessageException);
        expect(error.statusCode).toBe(400);
    }
});

test('Asociar perfil exitosamente', async () => {
    const data: IAsociarPerfilIn = {
        perfil: 1,
        id_usuario: 2,
    };

    const request: Req = { body: data, params: { idUsuario: 1 }, data: {} };

    const response: Response<Status | null> = await usuariosController.asociarPerfil(request);
    expect(response.status).toBe(200);
});
