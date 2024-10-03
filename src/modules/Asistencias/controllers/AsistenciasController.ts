import { injectable } from 'inversify';
import { Req } from '@modules/shared/infrastructure';
import { Response } from '@common/http/Response';
import { validateData } from '@common/util/Schemas';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import Result from '@common/http/Result';
import { Status } from '../../shared/infrastructure/Controller';
import TYPESDEPENDENCIES from '../dependencies/TypesDependencies';
import {
    ICrearAsistenciaSchema,
    IConsultarAsistenciaSchema,
    IListarAsistenciasSchema,
} from './schemas/IAsistenciasSchema';
import CrearAsistenciaUseCase from '../usecase/services/CrearAsistenciaUseCase';
import ConsultarAsistenciaUseCase from '../usecase/services/ConsultarAsistenciaUseCase';
import ListarAsistenciasUseCase from '../usecase/services/ListarAsistenciasUseCase';
import { ICrearAsistenciaIn, IConsultarAsistenciaIn, IListarAsistenciasIn } from '../usecase/dto/in/IAsistenciasIn';

@injectable()
export default class AsistenciasController {
    private crearAsistenciaUseCase = DEPENDENCY_CONTAINER.get<CrearAsistenciaUseCase>(
        TYPESDEPENDENCIES.CrearAsistenciaUseCase,
    );

    private consultarAsistenciaUseCase = DEPENDENCY_CONTAINER.get<ConsultarAsistenciaUseCase>(
        TYPESDEPENDENCIES.ConsultarAsistenciaUseCase,
    );

    private listarAsistenciasUseCase = DEPENDENCY_CONTAINER.get<ListarAsistenciasUseCase>(
        TYPESDEPENDENCIES.ListarAsistenciasUseCase,
    );

    async crearAsistencia(req: Req): Promise<Response<Status | null>> {
        const data = validateData<ICrearAsistenciaIn>(ICrearAsistenciaSchema, req.body);
        const asistenciaCreada = await this.crearAsistenciaUseCase.execute(data);
        return Result.ok<Status>({ ok: 'Asistencia creada exitosamente', data: asistenciaCreada });
    }

    async consultarAsistencia(req: Req): Promise<Response<Status | null>> {
        const data = validateData<IConsultarAsistenciaIn>(IConsultarAsistenciaSchema, req.params);
        const asistencia = await this.consultarAsistenciaUseCase.execute(data.id);
        return Result.ok<Status>({ ok: 'Asistencia consultada exitosamente', data: asistencia });
    }

    async listarAsistencias(req: Req): Promise<Response<Status | null>> {
        const filtros = validateData<IListarAsistenciasIn>(IListarAsistenciasSchema, req.body);
        const asistencias = await this.listarAsistenciasUseCase.execute(filtros);
        return Result.ok<Status>({ ok: 'Asistencias listadas exitosamente', data: asistencias });
    }
}
