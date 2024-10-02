import { injectable } from 'inversify';
import { Req } from '@modules/shared/infrastructure';
import { Response } from '@common/http/Response';
import { validateData } from '@common/util/Schemas';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import Result from '@common/http/Result';
import { Status } from '../../shared/infrastructure/Controller';
import TYPESDEPENDENCIES from '../dependencies/TypesDependencies';
import {
    ICrearEventoSchema,
    IActualizarEventoSchema,
    IEliminarEventoSchema,
    IConsultarEventoSchema,
    IListarEventosSchema,
} from './schemas/IEventosSchema';
import CrearEventoUseCase from '../usecase/services/CrearEventoUseCase';
import ActualizarEventoUseCase from '../usecase/services/ActualizarEventoUseCase';
import EliminarEventoUseCase from '../usecase/services/EliminarEventoUseCase';
import ConsultarEventoUseCase from '../usecase/services/ConsultarEventoUseCase';
import ListarEventosUseCase from '../usecase/services/ListarEventosUseCase';
import {
    ICrearEventoIn,
    IActualizarEventoIn,
    IEliminarEventoIn,
    IConsultarEventoIn,
    IListarEventosIn,
} from '../usecase/dto/in/IEventosIn';

@injectable()
export default class EventosController {
    private crearEventoUseCase = DEPENDENCY_CONTAINER.get<CrearEventoUseCase>(TYPESDEPENDENCIES.CrearEventoUseCase);

    private actualizarEventoUseCase = DEPENDENCY_CONTAINER.get<ActualizarEventoUseCase>(
        TYPESDEPENDENCIES.ActualizarEventoUseCase,
    );

    private eliminarEventoUseCase = DEPENDENCY_CONTAINER.get<EliminarEventoUseCase>(
        TYPESDEPENDENCIES.EliminarEventoUseCase,
    );

    private consultarEventoUseCase = DEPENDENCY_CONTAINER.get<ConsultarEventoUseCase>(
        TYPESDEPENDENCIES.ConsultarEventoUseCase,
    );

    private listarEventosUseCase = DEPENDENCY_CONTAINER.get<ListarEventosUseCase>(
        TYPESDEPENDENCIES.ListarEventosUseCase,
    );

    async crearEvento(req: Req): Promise<Response<Status | null>> {
        const data = validateData<ICrearEventoIn>(ICrearEventoSchema, req.body);
        const eventoCreado = await this.crearEventoUseCase.execute(data);
        return Result.ok<Status>({ ok: 'Evento creado exitosamente', data: eventoCreado });
    }

    async actualizarEvento(req: Req): Promise<Response<Status | null>> {
        const data = validateData<IActualizarEventoIn>(IActualizarEventoSchema, req.body);
        const eventoActualizado = await this.actualizarEventoUseCase.execute(data);
        return Result.ok<Status>({ ok: 'Evento actualizado exitosamente', data: eventoActualizado });
    }

    async eliminarEvento(req: Req): Promise<Response<Status | null>> {
        const data = validateData<IEliminarEventoIn>(IEliminarEventoSchema, req.params);
        await this.eliminarEventoUseCase.execute(data.id);
        return Result.ok<Status>({ ok: 'Evento eliminado exitosamente' });
    }

    async consultarEvento(req: Req): Promise<Response<Status | null>> {
        const data = validateData<IConsultarEventoIn>(IConsultarEventoSchema, req.params);
        const evento = await this.consultarEventoUseCase.execute(data.id);
        return Result.ok<Status>({ ok: 'Evento consultado exitosamente', data: evento });
    }

    async listarEventos(req: Req): Promise<Response<Status | null>> {
        const filtros = validateData<IListarEventosIn>(IListarEventosSchema, req.body);
        const eventos = await this.listarEventosUseCase.execute(filtros);
        return Result.ok<Status>({ ok: 'Eventos listados exitosamente', data: eventos });
    }
}
