import { injectable } from 'inversify';
import { Req } from '@modules/shared/infrastructure';
import { Response } from '@common/http/Response';
import { validateData } from '@common/util/Schemas';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import Result from '@common/http/Result';
import { Status } from '../../shared/infrastructure/Controller';
import TYPESDEPENDENCIES from '../dependencies/TypesDependencies';
import {
    ICrearCategoriaSchema,
    IActualizarCategoriaSchema,
    IEliminarCategoriaSchema,
    IConsultarCategoriaSchema,
} from './schemas/ICategoriasSchema';
import CrearCategoriaUseCase from '../usecase/services/CrearCategoriaUseCase';
import ActualizarCategoriaUseCase from '../usecase/services/ActualizarCategoriaUseCase';
import EliminarCategoriaUseCase from '../usecase/services/EliminarCategoriaUseCase';
import ConsultarCategoriaUseCase from '../usecase/services/ConsultarCategoriaUseCase';
import ListarCategoriasUseCase from '../usecase/services/ListarCategoriasUseCase';
import {
    ICrearCategoriaIn,
    IActualizarCategoriaIn,
    IEliminarCategoriaIn,
    IConsultarCategoriaIn,
} from '../usecase/dto/in/ICategoriasIn';

@injectable()
export default class CategoriasController {
    private crearCategoriaUseCase = DEPENDENCY_CONTAINER.get<CrearCategoriaUseCase>(
        TYPESDEPENDENCIES.CrearCategoriaUseCase,
    );

    private actualizarCategoriaUseCase = DEPENDENCY_CONTAINER.get<ActualizarCategoriaUseCase>(
        TYPESDEPENDENCIES.ActualizarCategoriaUseCase,
    );

    private eliminarCategoriaUseCase = DEPENDENCY_CONTAINER.get<EliminarCategoriaUseCase>(
        TYPESDEPENDENCIES.EliminarCategoriaUseCase,
    );

    private consultarCategoriaUseCase = DEPENDENCY_CONTAINER.get<ConsultarCategoriaUseCase>(
        TYPESDEPENDENCIES.ConsultarCategoriaUseCase,
    );

    private listarCategoriasUseCase = DEPENDENCY_CONTAINER.get<ListarCategoriasUseCase>(
        TYPESDEPENDENCIES.ListarCategoriasUseCase,
    );

    async crearCategoria(req: Req): Promise<Response<Status | null>> {
        const data = validateData<ICrearCategoriaIn>(ICrearCategoriaSchema, req.body);
        const categoriaCreada = await this.crearCategoriaUseCase.execute(data);
        return Result.ok<Status>({ ok: 'Categoría creada exitosamente', data: categoriaCreada });
    }

    async actualizarCategoria(req: Req): Promise<Response<Status | null>> {
        const data = validateData<IActualizarCategoriaIn>(IActualizarCategoriaSchema, req.body);
        const categoriaActualizada = await this.actualizarCategoriaUseCase.execute(data);
        return Result.ok<Status>({ ok: 'Categoría actualizada exitosamente', data: categoriaActualizada });
    }

    async eliminarCategoria(req: Req): Promise<Response<Status | null>> {
        const data = validateData<IEliminarCategoriaIn>(IEliminarCategoriaSchema, req.params);
        await this.eliminarCategoriaUseCase.execute(data.id);
        return Result.ok<Status>({ ok: 'Categoría eliminada exitosamente' });
    }

    async consultarCategoria(req: Req): Promise<Response<Status | null>> {
        const data = validateData<IConsultarCategoriaIn>(IConsultarCategoriaSchema, req.params);
        const categoria = await this.consultarCategoriaUseCase.execute(data.id);
        return Result.ok<Status>({ ok: 'Categoría consultada exitosamente', data: categoria });
    }

    async listarCategorias(): Promise<Response<Status | null>> {
        const categorias = await this.listarCategoriasUseCase.execute();
        return Result.ok<Status>({ ok: 'Categorías listadas exitosamente', data: categorias });
    }
}
