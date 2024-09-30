import 'reflect-metadata';
import { mockConfiguracionesDB } from './mocks/postgresql/crear-pg-mem';
import UsuariosController from '../controllers/UsuariosController';
import { Req, Status } from '@modules/shared/infrastructure';
import { Response } from '@common/http/Response';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import createDependencies from '../dependencies/Dependencies';
import { IDatabase, IMain } from 'pg-promise';
import { ICrearUsuariosIn } from '../usecase/dto/in/ICrearUsuariosIn';
import TYPESDEPENDENCIESCLIENTES from '@modules/Usuarioas/dependencies/TypesDependencies';
import TYPESDEPENDENCIESPERFILES from '@modules/Perfiles/dependencies/TypesDependencies';
import { ClientesRepository } from '@modules/Usuarioas/domain/repositories/ClientesRepository';
import PostgresClientesRepository from '@infrastructure/bd/dao/PostgresClientesRepository';
import { PerfilesRepository } from '@modules/Perfiles/domain/repositories/PerfilesRepository';
import PostgresPerfilesRepository from '@infrastructure/bd/dao/PostgresPerfilesRepository';
import TYPESDEPENDENCIESGLOBAL from '@common/dependencies/TypesDependencies';
import BadMessageException from '@common/http/exceptions/BadMessageException';


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

// test('Validar que el perfil exista en la base de datos tenant', async () => {
//     const data: ICrearUsuariosIn = {
//         nombres: 'Prueba',
//         apellidos: 'Usuario',
//         tipo_identificacion: 'CC',
//         identificacion: '123456789',
//         telefono: '123456789',
//         correo: 'prueba0101@gmail.com',
//         id_perfil: 1,
//     };

//     const request: Req = { body: data, params: {}, data: {}, tenantId: '01' };
//     const response: Response<Status | null> = await usuariosController.crearUsuario(request);
//     expect(response.status).toBe(200);
// });

// test('Crear usuario perfil null satisfactoriamente', async () => {
//     const data: ICrearUsuariosIn = {
//         nombres: 'Prueba',
//         apellidos: 'Usuario',
//         tipo_identificacion: 'CC',
//         identificacion: '123456789',
//         telefono: '123456789',
//         correo: 'prueba03@gmail.com',
//         id_perfil: null,
//     };

//     const request: Req = { body: data, params: {}, data: {}, tenantId: '01' };
//     const response: Response<Status | null> = await usuariosController.crearUsuario(request);
//     expect(response.status).toBe(200);
// });

// test('Crear usuario sin perfil satisfactoriamente', async () => {
//     const data: ICrearUsuariosIn = {
//         nombres: 'Prueba',
//         apellidos: 'Usuario',
//         tipo_identificacion: 'CC',
//         identificacion: '123456789',
//         telefono: '123456789',
//         correo: 'prueba04@gmail.com',
//     };

//     const request: Req = { body: data, params: {}, data: {}, tenantId: '01' };
//     const response: Response<Status | null> = await usuariosController.crearUsuario(request);
//     expect(response.status).toBe(200);
// });

// test('validar Codigo cliente no existe', async () => {
//     const data: ICrearUsuariosIn = {
//         nombres: 'Prueba',
//         apellidos: 'Usuario',
//         tipo_identificacion: 'CC',
//         identificacion: '123456789',
//         telefono: '123456789',
//         correo: 'prueba05@gmail.com',
//         id_perfil: 0,
//     };

//     const request: Req = { body: data, params: {}, data: {} };
//     try {
//         await usuariosController.crearUsuario(request);
//         fail('Se esperaba una excepción pero no se lanzó ninguna.');
//     } catch (error) {
//         expect(error).toBeInstanceOf(BadMessageException);
//         expect(error.statusCode).toBe(400);
//     }
// });

// test('validar Usuario ya fue creado', async () => {
//     const data: ICrearUsuariosIn = {
//         nombres: 'Prueba',
//         apellidos: 'Usuario',
//         tipo_identificacion: 'CC',
//         identificacion: '123456789',
//         telefono: '123456789',
//         correo: 'prueba01@gmail.com',
//         id_perfil: 0,
//     };
//     const request: Req = { body: data, params: {}, data: {}, tenantId: '01' };
//     try {
//         await usuariosController.crearUsuario(request);
//         fail('Se esperaba una excepción pero no se lanzó ninguna.');
//     } catch (error) {
//         expect(error).toBeInstanceOf(BadMessageException);
//         expect(error.statusCode).toBe(400);
//     }
// });

// test('Verificar Campos Obligatorios', async () => {
//     const data: ICrearUsuariosIn = {
//         nombres: '',
//         apellidos: '',
//         tipo_identificacion: '',
//         identificacion: '',
//         telefono: '',
//         correo: '',
//         id_perfil: 0,
//     };

//     const request: Req = { body: data, params: {}, data: {}, tenantId: '01' };
//     try {
//         await usuariosController.crearUsuario(request);
//         fail('Se esperaba una excepción pero no se lanzó ninguna.');
//     } catch (error) {
//         expect(error).toBeInstanceOf(BadMessageException);
//         expect(error.statusCode).toBe(400);
//     }
// });

// test('Verificar correo valido', async () => {
//     const data: ICrearUsuariosIn = {
//         nombres: 'Prueba',
//         apellidos: 'Usuario',
//         tipo_identificacion: 'CC',
//         identificacion: '123456789',
//         telefono: '123456789',
//         correo: 'correocorreo.com',
//         id_perfil: 0,
//     };

//     const request: Req = { body: data, params: {}, data: {}, tenantId: '01' };
//     try {
//         await usuariosController.crearUsuario(request);
//         fail('Se esperaba una excepción pero no se lanzó ninguna.');
//     } catch (error) {
//         expect(error).toBeInstanceOf(BadMessageException);
//         expect(error.statusCode).toBe(400);
//         expect(error.cause).toBe('"correo" debe ser un correo electrónico válido.');
//     }
// });

// test('validar correo es requerido', async () => {
//     const data: ICrearUsuariosIn = {
//         nombres: 'Prueba',
//         apellidos: 'Usuario',
//         tipo_identificacion: 'CC',
//         identificacion: '123456789',
//         telefono: '123456789',
//         correo: '',
//         id_perfil: null,
//     };

//     const request: Req = { body: data, params: {}, data: {}, tenantId: '01' };
//     try {
//         await usuariosController.crearUsuario(request);
//         fail('Se esperaba una excepción pero no se lanzó ninguna.');
//     } catch (error) {
//         expect(error).toBeInstanceOf(BadMessageException);
//         expect(error.statusCode).toBe(400);
//         expect(error.cause).toBe('"correo" es requerido.');
//     }
// });

// test('Campo Teléfono no Obligatorio', async () => {
//     const data: ICrearUsuariosIn = {
//         nombres: 'Prueba',
//         apellidos: 'Usuario',
//         tipo_identificacion: 'CC',
//         identificacion: '123456789',
//         telefono: '',
//         correo: 'correo06@gmail.com',
//         id_perfil: null,
//     };

//     const request: Req = { body: data, params: {}, data: {}, tenantId: '01' };
//     const response: Response<Status | null> = await usuariosController.crearUsuario(request);
//     expect(response.status).toBe(200);
// });

// test('Los valores de entrada no son correctos', async () => {
//     const data = {
//         nombres: 'juan',
//         apellidos: 'prueba2',
//         tipo_identificacion: 'CC',
//         identificacion: '123456789',
//         telefono: '123456789',
//     };
//     const request: Req = { body: data, params: {}, data: {}, tenantId: '01' };
//     try {
//         await usuariosController.crearUsuario(request);
//         fail('Se esperaba una excepción pero no se lanzó ninguna.');
//     } catch (error) {
//         expect(error).toBeInstanceOf(BadMessageException);
//         expect(error.statusCode).toBe(400);
//     }
// });
