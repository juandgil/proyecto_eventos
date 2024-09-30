import 'reflect-metadata';
import { mockConfiguracionesDB } from './mocks/postgresql/crear-pg-mem';
import UsuariosController from '../controllers/UsuariosController';
import { Req, Status } from '@modules/shared/infrastructure';
import { Response } from '@common/http/Response';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import createDependencies from '../dependencies/Dependencies';
import { IDatabase, IMain } from 'pg-promise';
import { ICrearUsuariosIn } from '../usecase/dto/in/ICrearUsuariosIn';
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

describe('CrearUsuarios', () => {
    it('Crear usuario con perfil existente correctamente', async () => {
        const data: ICrearUsuariosIn = {
            nombre_usuario: 'nuevo_usuario',
            correo: 'nuevo@ejemplo.com',
            contrasena: 'contrasena123',
            id_perfil: 1,
        };

        const request: Req = { body: data, params: {}, data: {} };
        const response: Response<Status | null> = await usuariosController.crearUsuario(request);
        expect(response.status).toBe(201);
    });

    it('No crear usuario con perfil inexistente', async () => {
        const data: ICrearUsuariosIn = {
            nombre_usuario: 'usuario_invalido',
            correo: 'invalido@ejemplo.com',
            contrasena: 'contrasena123',
            id_perfil: 999, // Un perfil que no existe
        };

        const request: Req = { body: data, params: {}, data: {} };
        await expect(usuariosController.crearUsuario(request)).rejects.toThrow(BadMessageException);
    });

    it('No crear usuario con correo duplicado', async () => {
        const data: ICrearUsuariosIn = {
            nombre_usuario: 'usuario_duplicado',
            correo: 'test1@ejemplo.com', // Este correo ya existe en la base de datos
            contrasena: 'contrasena123',
            id_perfil: 1,
        };

        const request: Req = { body: data, params: {}, data: {} };
        await expect(usuariosController.crearUsuario(request)).rejects.toThrow(BadMessageException);
    });

    it('No crear usuario con nombre de usuario duplicado', async () => {
        const data: ICrearUsuariosIn = {
            nombre_usuario: 'usuario_test1', // Este nombre de usuario ya existe en la base de datos
            correo: 'nuevo_correo@ejemplo.com',
            contrasena: 'contrasena123',
            id_perfil: 1,
        };

        const request: Req = { body: data, params: {}, data: {} };
        await expect(usuariosController.crearUsuario(request)).rejects.toThrow(BadMessageException);
    });

    it('No crear usuario con correo inválido', async () => {
        const data: ICrearUsuariosIn = {
            nombre_usuario: 'usuario_correo_invalido',
            correo: 'correo_invalido',
            contrasena: 'contrasena123',
            id_perfil: 1,
        };

        const request: Req = { body: data, params: {}, data: {} };
        await expect(usuariosController.crearUsuario(request)).rejects.toThrow(BadMessageException);
    });

    it('No crear usuario con campos faltantes', async () => {
        const data = {
            nombre_usuario: 'usuario_incompleto',
            correo: 'incompleto@ejemplo.com',
            // Falta la contraseña y el id_perfil
        };

        const request: Req = { body: data, params: {}, data: {} };
        await expect(usuariosController.crearUsuario(request)).rejects.toThrow(BadMessageException);
    });

    it('Crear usuario con perfil por defecto si no se proporciona', async () => {
        const data = {
            nombre_usuario: 'usuario_sin_perfil',
            correo: 'sin_perfil@ejemplo.com',
            contrasena: 'contrasena123',
            // No se proporciona id_perfil
        };

        const request: Req = { body: data, params: {}, data: {} };
        const response: Response<Status | null> = await usuariosController.crearUsuario(request);
        expect(response.status).toBe(201);
    });
});
