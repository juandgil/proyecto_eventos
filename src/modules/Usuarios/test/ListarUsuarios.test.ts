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

describe('ListarUsuarios', () => {
    it('Listar usuarios correctamente', async () => {
        const request: Req = { params: {}, body: {}, data: {} };
        const response: Response<any> = await usuariosController.listarUsuarios();
        expect(response.status).toBe(200);
        expect(response.response.data?.ok).toBe('Usuarios listados exitosamente');
        expect(Array.isArray(response.response.data?.data)).toBe(true);
    });

    it('Verificar que la lista de usuarios no está vacía', async () => {
        const request: Req = { params: {}, body: {}, data: {} };
        const response: Response<any> = await usuariosController.listarUsuarios();
        expect(response.response.data?.data.length).toBeGreaterThan(0);
    });

    it('Verificar que cada usuario en la lista tiene los campos esperados', async () => {
        const request: Req = { params: {}, body: {}, data: {} };
        const response: Response<any> = await usuariosController.listarUsuarios();
        const usuarios = response.response.data?.data;
        usuarios.forEach((usuario: any) => {
            expect(usuario).toHaveProperty('idUsuario');
            expect(usuario).toHaveProperty('nombreUsuario');
            expect(usuario).toHaveProperty('correo');
            expect(usuario).toHaveProperty('idPerfil');
            expect(usuario).toHaveProperty('activo');
        });
    });
});
