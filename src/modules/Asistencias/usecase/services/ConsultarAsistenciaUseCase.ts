import { injectable, inject } from 'inversify';
import NotFoundException from '@common/http/exceptions/NotFoundException';
import { AsistenciasRepository } from '../../domain/repositories/AsistenciasRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import Asistencias from '../../domain/entities/Asistencias';
import { IConsultarAsistenciaOut } from '../dto/out/IConsultarAsistenciasOut';

@injectable()
export default class ConsultarAsistenciaUseCase {
    constructor(
        @inject(TYPESDEPENDENCIES.AsistenciasRepository) private asistenciasRepository: AsistenciasRepository,
    ) {}

    async execute(idAsistencia: number): Promise<IConsultarAsistenciaOut> {
        const asistencia = await this.asistenciasRepository.consultar(idAsistencia);
        if (!asistencia) {
            throw new NotFoundException(
                'Asistencia no encontrada',
                `No se encontró la asistencia con ID ${idAsistencia}`,
            );
        }

        const [usuario, evento] = await Promise.all([
            this.asistenciasRepository.obtenerUsuario(asistencia.id_usuario),
            this.asistenciasRepository.obtenerEvento(asistencia.id_evento),
        ]);

        return this.construirAsistenciaDTO(asistencia, usuario, evento);
    }

    private construirAsistenciaDTO(
        asistencia: Asistencias,
        usuario: { id_usuario: number; nombre_usuario: string },
        evento: { id_evento: number; titulo: string },
    ): IConsultarAsistenciaOut {
        return {
            id_asistencia: asistencia.id_asistencia ?? 0,
            usuario: {
                id_usuario: usuario.id_usuario,
                nombre_usuario: usuario.nombre_usuario,
            },
            evento: {
                id_evento: evento.id_evento,
                titulo: evento.titulo,
            },
            creado_en: asistencia.creado_en ?? new Date(),
        };
    }
}
