import { injectable } from 'inversify';
import { Req } from '@modules/shared/infrastructure';
import { Response } from '@common/http/Response';
import { validateData } from '@common/util/Schemas';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import Result from '@common/http/Result';
import { Status } from '../../shared/infrastructure/Controller';
import TYPESDEPENDENCIES from '../dependencies/TypesDependencies';
import {
    ICrearPerfilSchema,
    IActualizarPerfilSchema,
    IEliminarPerfilSchema,
    IConsultarPerfilSchema,
} from './schemas/IPerfilesSchema';
import CrearPerfilUseCase from '../usecase/services/CrearPerfilUseCase';
import ActualizarPerfilUseCase from '../usecase/services/ActualizarPerfilUseCase';
import EliminarPerfilUseCase from '../usecase/services/EliminarPerfilUseCase';
import ConsultarPerfilUseCase from '../usecase/services/ConsultarPerfilUseCase';
import ListarPerfilesUseCase from '../usecase/services/ListarPerfilesUseCase';
import {
    ICrearPerfilIn,
    IActualizarPerfilIn,
    IEliminarPerfilIn,
    IConstultarPerfilesIn,
} from '../usecase/dto/in/IPerfilesIn';

@injectable()
export default class PerfilesController {
    private crearPerfilUseCase = DEPENDENCY_CONTAINER.get<CrearPerfilUseCase>(TYPESDEPENDENCIES.CrearPerfilUseCase);

    private actualizarPerfilUseCase = DEPENDENCY_CONTAINER.get<ActualizarPerfilUseCase>(
        TYPESDEPENDENCIES.ActualizarPerfilUseCase,
    );

    private eliminarPerfilUseCase = DEPENDENCY_CONTAINER.get<EliminarPerfilUseCase>(
        TYPESDEPENDENCIES.EliminarPerfilUseCase,
    );

    private consultarPerfilUseCase = DEPENDENCY_CONTAINER.get<ConsultarPerfilUseCase>(
        TYPESDEPENDENCIES.ConsultarPerfilUseCase,
    );

    private listarPerfilesUseCase = DEPENDENCY_CONTAINER.get<ListarPerfilesUseCase>(
        TYPESDEPENDENCIES.ListarPerfilesUseCase,
    );

    async crearPerfil(req: Req): Promise<Response<Status | null>> {
        const data = validateData<ICrearPerfilIn>(ICrearPerfilSchema, req.body);
        const perfilCreado = await this.crearPerfilUseCase.execute(data);
        return Result.ok<Status>({ ok: 'Perfil creado exitosamente', data: perfilCreado });
    }

    async actualizarPerfil(req: Req): Promise<Response<Status | null>> {
        const data = validateData<IActualizarPerfilIn>(IActualizarPerfilSchema, req.body);
        const perfilActualizado = await this.actualizarPerfilUseCase.execute(data);
        return Result.ok<Status>({ ok: 'Perfil actualizado exitosamente', data: perfilActualizado });
    }

    async eliminarPerfil(req: Req): Promise<Response<Status | null>> {
        const data = validateData<IEliminarPerfilIn>(IEliminarPerfilSchema, req.params);
        await this.eliminarPerfilUseCase.execute(data.id);
        return Result.ok<Status>({ ok: 'Perfil eliminado exitosamente' });
    }

    async consultarPerfil(req: Req): Promise<Response<Status | null>> {
        const data = validateData<IConstultarPerfilesIn>(IConsultarPerfilSchema, req.params);
        const perfil = await this.consultarPerfilUseCase.execute(data.id);
        return Result.ok<Status>({ ok: 'Perfil consultado exitosamente', data: perfil });
    }

    async listarPerfiles(): Promise<Response<Status | null>> {
        const perfiles = await this.listarPerfilesUseCase.execute();
        return Result.ok<Status>({ ok: 'Perfiles listados exitosamente', data: perfiles });
    }
}
