import { Req } from '@modules/shared/infrastructure';
import { injectable } from 'inversify';
import { Response } from '@common/http/Response';
import { validateData } from '@common/util/Schemas';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import Result from '@common/http/Result';
import { Status } from '../../shared/infrastructure/Controller';
import { ICrearUsuariosIn, ILoginUsuariosIn, IAsociarPerfilIn } from '../usecase/dto/in';
import TYPESDEPENDENCIES from '../dependencies/TypesDependencies';
import ICrearUsuariosSchema from './schemas/ICrearUsuariosSchema';
import IAsociarPerfilSchema from './schemas/IAsociarPerfilSchema';
import LoginUsuariosSchema from './schemas/LoginUsuariosSchema';
import AsociarPerfilUseCase from '../usecase/services/AsociarPerfilUseCase';
import CrearUsuariosUseCase from '../usecase/services/CrearUsuariosUseCase';
import GenerarTokenUseCase from '../usecase/services/GenerarTokenUseCase';

@injectable()
export default class UsuariosController {
    private crearUsuarioUseCase = DEPENDENCY_CONTAINER.get<CrearUsuariosUseCase>(
        TYPESDEPENDENCIES.CrearUsuariosUseCase,
    );

    private asociarPerfilUseCase = DEPENDENCY_CONTAINER.get<AsociarPerfilUseCase>(
        TYPESDEPENDENCIES.AsociarPerfilUseCase,
    );

    private generarTokenUseCase = DEPENDENCY_CONTAINER.get<GenerarTokenUseCase>(TYPESDEPENDENCIES.GenerarTokenUseCase);

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
}
