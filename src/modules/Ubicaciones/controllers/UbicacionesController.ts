import { injectable } from 'inversify';
import { Req } from '@modules/shared/infrastructure';
import { Response } from '@common/http/Response';
import { validateData } from '@common/util/Schemas';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import Result from '@common/http/Result';
import { Status } from '../../shared/infrastructure/Controller';
import TYPESDEPENDENCIES from '../dependencies/TypesDependencies';
import {
    ICrearUbicacionSchema,
    IActualizarUbicacionSchema,
    IEliminarUbicacionSchema,
    IConsultarUbicacionSchema,
} from './schemas/IUbicacionesSchema';
import CrearUbicacionUseCase from '../usecase/services/CrearUbicacionUseCase';
import ActualizarUbicacionUseCase from '../usecase/services/ActualizarUbicacionesUseCase';
import EliminarUbicacionUseCase from '../usecase/services/EliminarUbicacionUseCase';
import ConsultarUbicacionUseCase from '../usecase/services/ConsultarUbicacionesUseCase';
import ListarUbicacionesUseCase from '../usecase/services/ListarUbicacionesUseCase';
import {
    ICrearUbicacionIn,
    IActualizarUbicacionIn,
    IEliminarUbicacionIn,
    IConsultarUbicacionIn,
} from '../usecase/dto/in/IUbicacionesIn';

@injectable()
export default class UbicacionesController {
    private crearUbicacionUseCase = DEPENDENCY_CONTAINER.get<CrearUbicacionUseCase>(
        TYPESDEPENDENCIES.CrearUbicacionUseCase,
    );

    private actualizarUbicacionUseCase = DEPENDENCY_CONTAINER.get<ActualizarUbicacionUseCase>(
        TYPESDEPENDENCIES.ActualizarUbicacionUseCase,
    );

    private eliminarUbicacionUseCase = DEPENDENCY_CONTAINER.get<EliminarUbicacionUseCase>(
        TYPESDEPENDENCIES.EliminarUbicacionUseCase,
    );

    private consultarUbicacionUseCase = DEPENDENCY_CONTAINER.get<ConsultarUbicacionUseCase>(
        TYPESDEPENDENCIES.ConsultarUbicacionUseCase,
    );

    private listarUbicacionesUseCase = DEPENDENCY_CONTAINER.get<ListarUbicacionesUseCase>(
        TYPESDEPENDENCIES.ListarUbicacionesUseCase,
    );

    async crearUbicacion(req: Req): Promise<Response<Status | null>> {
        const data = validateData<ICrearUbicacionIn>(ICrearUbicacionSchema, req.body);
        const ubicacionCreada = await this.crearUbicacionUseCase.execute(data);
        return Result.ok<Status>({ ok: 'Ubicación creada exitosamente', data: ubicacionCreada });
    }

    async actualizarUbicacion(req: Req): Promise<Response<Status | null>> {
        const data = validateData<IActualizarUbicacionIn>(IActualizarUbicacionSchema, req.body);
        const ubicacionActualizada = await this.actualizarUbicacionUseCase.execute(data);
        return Result.ok<Status>({ ok: 'Ubicación actualizada exitosamente', data: ubicacionActualizada });
    }

    async eliminarUbicacion(req: Req): Promise<Response<Status | null>> {
        const data = validateData<IEliminarUbicacionIn>(IEliminarUbicacionSchema, req.params);
        await this.eliminarUbicacionUseCase.execute(data.id);
        return Result.ok<Status>({ ok: 'Ubicación eliminada exitosamente' });
    }

    async consultarUbicacion(req: Req): Promise<Response<Status | null>> {
        const data = validateData<IConsultarUbicacionIn>(IConsultarUbicacionSchema, req.params);
        const ubicacion = await this.consultarUbicacionUseCase.execute(data.id);
        return Result.ok<Status>({ ok: 'Ubicación consultada exitosamente', data: ubicacion });
    }

    async listarUbicaciones(): Promise<Response<Status | null>> {
        const ubicaciones = await this.listarUbicacionesUseCase.execute();
        return Result.ok<Status>({ ok: 'Ubicaciones listadas exitosamente', data: ubicaciones });
    }
}
