import { Req } from '@modules/shared/infrastructure';
import { injectable } from 'inversify';
import { Response } from '@common/http/Response';
import { validateData } from '@common/util/Schemas';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import Result from '@common/http/Result';
import { Status } from '../../shared/infrastructure/Controller';
import { ICrearUsuariosIn, ILoginUsuariosIn, IAsociarPerfilIn, IActualizarUsuarioIn } from '../usecase/dto/in';
import TYPESDEPENDENCIES from '../dependencies/TypesDependencies';
import { ICrearUsuariosSchema, LoginUsuariosSchema, IActualizarUsuarioSchema, InactivarUsuarioSchema } from './schemas';
import IAsociarPerfilSchema from './schemas/IAsociarPerfilSchema';
import AsociarPerfilUseCase from '../usecase/services/AsociarPerfilUseCase';
import CrearUsuariosUseCase from '../usecase/services/CrearUsuariosUseCase';
import GenerarTokenUseCase from '../usecase/services/GenerarTokenUseCase';
import ActualizarUsuarioUseCase from '../usecase/services/ActualizarUsuarioUseCase';
import InactivarUsuarioUseCase from '../usecase/services/InactivarUsuarioUseCase';
import ConsultarUsuarioUseCase from '../usecase/services/ConsultarUsuarioUseCase';
import ListarUsuariosUseCase from '../usecase/services/ListarUsuariosUseCase';

@injectable()
export default class UsuariosController {
    private crearUsuarioUseCase = DEPENDENCY_CONTAINER.get<CrearUsuariosUseCase>(
        TYPESDEPENDENCIES.CrearUsuariosUseCase,
    );

    private asociarPerfilUseCase = DEPENDENCY_CONTAINER.get<AsociarPerfilUseCase>(
        TYPESDEPENDENCIES.AsociarPerfilUseCase,
    );

    private generarTokenUseCase = DEPENDENCY_CONTAINER.get<GenerarTokenUseCase>(TYPESDEPENDENCIES.GenerarTokenUseCase);

    private actualizarUsuarioUseCase = DEPENDENCY_CONTAINER.get<ActualizarUsuarioUseCase>(
        TYPESDEPENDENCIES.ActualizarUsuarioUseCase,
    );

    private InactivarUsuarioUseCase = DEPENDENCY_CONTAINER.get<InactivarUsuarioUseCase>(
        TYPESDEPENDENCIES.InactivarUsuarioUseCase,
    );

    private consultarUsuarioUseCase = DEPENDENCY_CONTAINER.get<ConsultarUsuarioUseCase>(
        TYPESDEPENDENCIES.ConsultarUsuarioUseCase,
    );

    private listarUsuariosUseCase = DEPENDENCY_CONTAINER.get<ListarUsuariosUseCase>(
        TYPESDEPENDENCIES.ListarUsuariosUseCase,
    );

    async crearUsuario(req: Req): Promise<Response<Status | null>> {
        const data = validateData<ICrearUsuariosIn>(ICrearUsuariosSchema, req.body);
        await this.crearUsuarioUseCase.execute(data);
        return Result.ok<Status>({ ok: 'Usuario creado exitosamente' });
    }

    async iniciarSesion(req: Req): Promise<Response<Status | null>> {
        const data = validateData<ILoginUsuariosIn>(LoginUsuariosSchema, req.body);
        const token = await this.generarTokenUseCase.execute(data);
        return Result.ok<Status>({ ok: 'Inicio de sesión exitoso', data: { token } });
    }

    async asociarPerfil(req: Req): Promise<Response<Status | null>> {
        const data = validateData<IAsociarPerfilIn>(IAsociarPerfilSchema, req.body);
        await this.asociarPerfilUseCase.execute(data);
        return Result.ok<Status>({
            ok: 'El usuario fue asociado correctamente',
        });
    }

    async actualizarUsuario(req: Req): Promise<Response<Status | null>> {
        const data = validateData<IActualizarUsuarioIn>(IActualizarUsuarioSchema, req.body);
        await this.actualizarUsuarioUseCase.execute(data);
        return Result.ok<Status>({ ok: 'Usuario actualizado exitosamente' });
    }

    private inactivarUsuarioUseCase = DEPENDENCY_CONTAINER.get<InactivarUsuarioUseCase>(
        TYPESDEPENDENCIES.InactivarUsuarioUseCase,
    );

    async inactivarUsuario(req: Req): Promise<Response<Status | null>> {
        const data = validateData<{ id: number }>(InactivarUsuarioSchema, req.params);
        await this.inactivarUsuarioUseCase.execute(data.id);
        return Result.ok<Status>({ ok: 'Usuario inactivado exitosamente' });
    }

    async consultarUsuario(req: Req): Promise<Response<Status | null>> {
        const data = validateData<{ id: number }>(InactivarUsuarioSchema, req.params);
        const usuario = await this.consultarUsuarioUseCase.execute(data.id);
        return Result.ok<Status>({ ok: 'Usuario consultado exitosamente', data: usuario });
    }

    async listarUsuarios(): Promise<Response<Status | null>> {
        const usuarios = await this.listarUsuariosUseCase.execute();
        return Result.ok<Status>({ ok: 'Usuarios listados exitosamente', data: usuarios });
    }
}
