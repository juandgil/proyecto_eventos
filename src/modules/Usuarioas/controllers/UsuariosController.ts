import { Req } from '@modules/shared/infrastructure';
import { injectable } from 'inversify';
import { Response } from '@common/http/Response';
import { validateData } from '@common/util/Schemas';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import Result from '@common/http/Result';
import { Status } from '../../shared/infrastructure/Controller';
import { IGuardarUsuariosFIn } from '../usecase/dto/in';

import TYPESDEPENDENCIES from '../dependencies/TypesDependencies';
import ICrearUsuariosSchema from './schemas/ICrearUsuariosSchema';
import CrearUsuariosUseCase from '../usecase/services/CrearUsuariosUseCase';
import ICrearUsuariosSuiteSchema from './schemas/ICrearUsuariosSuiteSchema';
import CrearUsuariosSuiteUseCase from '../usecase/services/CrearUsuariosSuiteUseCase';
import { ICrearUsuariosSuiteIn } from '../usecase/dto/in/ICrearUsuariosSuiteIn';
import AsociarPerfilUseCase from '../usecase/services/AsociarPerfilUseCase';
import { IAsociarPerfilIn } from '../usecase/dto/in/IAsociarPerfilIn';
import IAsociarPerfilSchema from './schemas/IAsociarPerfilSchema';
import IResponseCrearUsuarioOut from '../usecase/dto/out/IResponseCrearUsuarioOut';

@injectable()
export default class UsuariosController {
    private crearUsuarioUseCase = DEPENDENCY_CONTAINER.get<CrearUsuariosUseCase>(
        TYPESDEPENDENCIES.CrearUsuariosUseCase,
    );

    private crearUsuarioSuiteUseCase = DEPENDENCY_CONTAINER.get<CrearUsuariosSuiteUseCase>(
        TYPESDEPENDENCIES.CrearUsuariosSuiteUseCase,
    );

    private asociarPerfilUseCase = DEPENDENCY_CONTAINER.get<AsociarPerfilUseCase>(
        TYPESDEPENDENCIES.AsociarPerfilUseCase,
    );

    async crearUsuario(_req: Req): Promise<Response<Status | null>> {
        const data = validateData<IGuardarUsuariosFIn>(ICrearUsuariosSchema, _req.body);
        const resultado = await this.crearUsuarioUseCase.execute(data, _req?.tenantId);
        return Result.ok<Status>({ ok: resultado });
    }

    async crearUsuarioSuite(_req: Req): Promise<Response<Status | null>> {
        const data = validateData<ICrearUsuariosSuiteIn>(ICrearUsuariosSuiteSchema, _req.body);
        const resultado = await this.crearUsuarioSuiteUseCase.execute(data);
        return Result.ok<Status>({
            ok: 'El usuario se guardo correctamente',
            resultado: new IResponseCrearUsuarioOut(resultado),
        });
    }

    async asociarPerfil(_req: Req): Promise<Response<Status | null>> {
        const data = validateData<IAsociarPerfilIn>(IAsociarPerfilSchema, _req.body);
        const params = _req.params as { idUsuario: number };
        await this.asociarPerfilUseCase.execute(data, params.idUsuario);
        return Result.ok<Status>({
            ok: 'El usuario fue asociado correctamente',
        });
    }
}
