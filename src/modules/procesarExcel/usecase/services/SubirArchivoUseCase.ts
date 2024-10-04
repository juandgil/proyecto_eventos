import { injectable, inject } from 'inversify';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import { ProcesarExcelRepository } from '../../domain/repositories/ProcesarExcelRepository';
import { ISubirArchivoIn } from '../dto/in/IProcesarExcelIn';
import Bull from 'bull';

@injectable()
export default class SubirArchivoUseCase {
    private procesarExcelQueue: Bull.Queue;

    constructor(
        @inject(TYPESDEPENDENCIES.ProcesarExcelRepository) private procesarExcelRepository: ProcesarExcelRepository,
    ) {
        this.procesarExcelQueue = new Bull('procesarExcel');
    }

    async execute(data: ISubirArchivoIn): Promise<{ id: string }> {
        const id = await this.procesarExcelRepository.guardarArchivo(data.archivo);
        await this.procesarExcelQueue.add({ id });
        return { id };
    }
}
