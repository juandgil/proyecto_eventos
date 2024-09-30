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

describe('AsociarPerfil', () => {
    it('Validar que el perfil exista', async () => {
        const data: IAsociarPerfilIn = {
            perfil: 999, // Un perfil que no existe
            id_usuario: 1,
        };

        const request: Req = { body: data, params: { idUsuario: 1 }, data: {} };

        await expect(usuariosController.asociarPerfil(request)).rejects.toThrow(BadMessageException);
    });

    it('Validar que el usuario exista', async () => {
        const data: IAsociarPerfilIn = {
            perfil: 1,
            id_usuario: 999, // Un usuario que no existe
        };

        const request: Req = { body: data, params: { idUsuario: 999 }, data: {} };

        await expect(usuariosController.asociarPerfil(request)).rejects.toThrow(BadMessageException);
    });

    it('Asociar perfil exitosamente', async () => {
        const data: IAsociarPerfilIn = {
            perfil: 1,
            id_usuario: 1,
        };

        const request: Req = { body: data, params: { idUsuario: 1 }, data: {} };

        const response: Response<Status | null> = await usuariosController.asociarPerfil(request);
        expect(response.status).toBe(200);
    });
});
