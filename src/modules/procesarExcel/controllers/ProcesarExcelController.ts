import { injectable } from 'inversify';
import { Req } from '@modules/shared/infrastructure';
import { Response } from '@common/http/Response';
import Result from '@common/http/Result';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import { MultipartFile } from 'fastify-multipart';
import { Status } from '../../shared/infrastructure/Controller';
import TYPESDEPENDENCIES from '../dependencies/TypesDependencies';
import { IConsultarEstadoSchema } from '../schemas/IProcesarExcelSchema';
import SubirArchivoUseCase from '../usecase/services/SubirArchivoUseCase';
import ConsultarEstadoUseCase from '../usecase/services/ConsultarEstadoUseCase';
import { IConsultarEstadoIn } from '../usecase/dto/in/IProcesarExcelIn';

@injectable()
export default class ProcesarExcelController {
    private subirArchivoUseCase = DEPENDENCY_CONTAINER.get<SubirArchivoUseCase>(TYPESDEPENDENCIES.SubirArchivoUseCase);

    private consultarEstadoUseCase = DEPENDENCY_CONTAINER.get<ConsultarEstadoUseCase>(
        TYPESDEPENDENCIES.ConsultarEstadoUseCase,
    );

    async subirArchivo(req: Req): Promise<Response<Status | null>> {
        const file = req.file as MultipartFile;
        if (!file) {
            throw new Error('No se ha subido ningún archivo');
        }
        const buffer = await file.toBuffer();
        const resultado = await this.subirArchivoUseCase.execute({ archivo: buffer });
        return Result.ok<Status>({ ok: 'Archivo subido exitosamente', data: resultado });
    }

    async consultarEstado(req: Req): Promise<Response<Status | null>> {
        const data = IConsultarEstadoSchema.parse(req.params) as IConsultarEstadoIn;
        const estado = await this.consultarEstadoUseCase.execute(data.id);
        return Result.ok<Status>({ ok: 'Estado consultado exitosamente', data: estado });
    }
}
