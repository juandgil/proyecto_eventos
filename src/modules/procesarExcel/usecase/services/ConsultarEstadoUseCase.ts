import { injectable, inject } from 'inversify';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import { ProcesarExcelRepository } from '../../domain/repositories/ProcesarExcelRepository';

@injectable()
export default class ConsultarEstadoUseCase {
    constructor(
        @inject(TYPESDEPENDENCIES.ProcesarExcelRepository) private procesarExcelRepository: ProcesarExcelRepository,
    ) {}

    async execute(id: string): Promise<{ estado: string }> {
        const estado = await this.procesarExcelRepository.obtenerEstado(id);
        return { estado };
    }
}
