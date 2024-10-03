import { injectable, inject } from 'inversify';
import { AsistenciasRepository } from '../../domain/repositories/AsistenciasRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import { IListarAsistenciasIn } from '../dto/in/IAsistenciasIn';
import { IListarAsistenciasOut } from '../dto/out/IListarAsistenciasOut';
import Asistencias from '../../domain/entities/Asistencias';

@injectable()
export default class ListarAsistenciasUseCase {
    constructor(
        @inject(TYPESDEPENDENCIES.AsistenciasRepository) private asistenciasRepository: AsistenciasRepository,
    ) {}

    async execute(filtros: IListarAsistenciasIn): Promise<IListarAsistenciasOut> {
        const page = filtros.page ?? 1;
        const limit = filtros.limit ?? 10;

        // Aplicar filtros
        const asistencias: Asistencias[] = await this.asistenciasRepository.listar({
            page,
            limit,
            id_usuario: filtros.id_usuario,
            id_evento: filtros.id_evento,
        });

        // Obtener el total de asistencias (sin paginación)
        const totalAsistencias = await this.asistenciasRepository.contarAsistencias({
            id_usuario: filtros.id_usuario,
            id_evento: filtros.id_evento,
        });

        // Calcular el total de páginas
        const totalPaginas = Math.ceil(totalAsistencias / limit);

        return {
            asistencias,
            paginacion: {
                paginaActual: page,
                totalPaginas,
                totalAsistencias,
                asistenciasPorPagina: limit,
            },
        };
    }
}
