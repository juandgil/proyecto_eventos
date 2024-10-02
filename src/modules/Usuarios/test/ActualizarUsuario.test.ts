import 'reflect-metadata';
import { Req } from '@modules/shared/infrastructure';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import { IDatabase, IMain } from 'pg-promise';
import TYPESDEPENDENCIESPERFILES from '@modules/Perfiles/dependencies/TypesDependencies';
import { PerfilesRepository } from '@modules/Perfiles/domain/repositories/PerfilesRepository';
import PostgresPerfilesRepository from '@infrastructure/bd/dao/PostgresPerfilesRepository';
import TYPESDEPENDENCIESGLOBAL from '@common/dependencies/TypesDependencies';
import { beforeAll, describe, expect, it } from '@jest/globals';
import { IActualizarUsuarioIn } from '../usecase/dto/in/IUsuariosIn';
import createDependencies from '../dependencies/Dependencies';
import UsuariosController from '../controllers/UsuariosController';
import { mockConfiguracionesDB } from './mocks/postgresql/crear-pg-mem';
import { Response } from '@common/http/Response';
import { Status } from '../../shared/infrastructure/Controller';

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

describe('ActualizarUsuario', () => {
    it('Actualizar usuario correctamente', async () => {
        const data: IActualizarUsuarioIn = {
            id_usuario: 1,
            nombre_usuario: 'usuario_actualizado',
            correo: 'actualizado@ejemplo.com',
        };

        const request: Req = { body: data, params: {}, data: {} };
        const response: Response<Status | null> = await usuariosController.actualizarUsuario(request);
        expect(response.response.isError).toBe(false);
        expect(response.status).toBe(200);
        expect(response.response.data?.ok).toBe('Usuario actualizado exitosamente');
    });

    it('No actualizar usuario con ID inexistente', async () => {
        const data: IActualizarUsuarioIn = {
            id_usuario: 999,
            nombre_usuario: 'usuario_inexistente',
        };

        const request: Req = { body: data, params: {}, data: {} };
        await expect(usuariosController.actualizarUsuario(request)).rejects.toThrow(
            'El usuario especificado no existe',
        );
    });

    it('Actualizar contraseña de usuario correctamente', async () => {
        const data: IActualizarUsuarioIn = {
            id_usuario: 1,
            contrasena: 'nueva_contrasena_segura',
        };

        const request: Req = { body: data, params: {}, data: {} };
        const response: Response<Status | null> = await usuariosController.actualizarUsuario(request);
        expect(response.response.isError).toBe(false);
        expect(response.status).toBe(200);
        expect(response.response.data?.ok).toBe('Usuario actualizado exitosamente');
    });

    it('Actualizar perfil de usuario correctamente', async () => {
        const data: IActualizarUsuarioIn = {
            id_usuario: 1,
            id_perfil: 2,
        };

        const request: Req = { body: data, params: {}, data: {} };
        const response: Response<Status | null> = await usuariosController.actualizarUsuario(request);
        expect(response.response.isError).toBe(false);
        expect(response.status).toBe(200);
        expect(response.response.data?.ok).toBe('Usuario actualizado exitosamente');
    });

    it('No actualizar usuario con perfil inexistente', async () => {
        const data: IActualizarUsuarioIn = {
            id_usuario: 1,
            id_perfil: 999,
        };

        const request: Req = { body: data, params: {}, data: {} };
        await expect(usuariosController.actualizarUsuario(request)).rejects.toThrow('El perfil especificado no existe');
    });
});
