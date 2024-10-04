import Bull from 'bull';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import TYPESDEPENDENCIES from '@modules/procesarExcel/dependencies/TypesDependencies';
import { ProcesarExcelRepository } from '@modules/procesarExcel/domain/repositories/ProcesarExcelRepository';

const procesarExcelQueue = new Bull('procesarExcel');

procesarExcelQueue.process(async (job) => {
    const { id } = job.data;
    const procesarExcelRepository = DEPENDENCY_CONTAINER.get<ProcesarExcelRepository>(
        TYPESDEPENDENCIES.ProcesarExcelRepository,
    );

    try {
        await procesarExcelRepository.actualizarEstado(id, 'procesando');

        // Aquí iría la lógica para procesar el archivo Excel
        // Por ejemplo:
        // const archivo = await procesarExcelRepository.obtenerArchivo(id);
        // const workbook = xlsx.read(archivo, { type: 'buffer' });
        // const sheetName = workbook.SheetNames[0];
        // const sheet = workbook.Sheets[sheetName];
        // const data = xlsx.utils.sheet_to_json(sheet);
        // Procesar data...

        await procesarExcelRepository.actualizarEstado(id, 'completado');
    } catch (error) {
        await procesarExcelRepository.actualizarEstado(id, 'error');
        throw error;
    }
});
