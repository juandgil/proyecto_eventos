import { injectable, inject } from 'inversify';
import BadMessageException from '@common/http/exceptions/BadMessageException';
import NotFoundException from '@common/http/exceptions/NotFoundException';
import { AsistenciasRepository } from '../../domain/repositories/AsistenciasRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import Asistencias from '../../domain/entities/Asistencias';
import { ICrearAsistenciaIn } from '../dto/in/IAsistenciasIn';

@injectable()
export default class CrearAsistenciaUseCase {
    constructor(
        @inject(TYPESDEPENDENCIES.AsistenciasRepository) private asistenciasRepository: AsistenciasRepository,
    ) {}

    async execute(data: ICrearAsistenciaIn): Promise<Asistencias> {
        // Validar que no exista una asistencia para el mismo usuario y evento
        const asistenciaExistente = await this.asistenciasRepository.buscarPorUsuarioYEvento(
            data.id_usuario,
            data.id_evento,
        );
        if (asistenciaExistente) {
            throw new BadMessageException(
                'Asistencia ya existe',
                'Ya existe una asistencia para este usuario y evento',
            );
        }

        // Validar que el usuario y el evento existan
        await this.validarRelaciones(data);

        // Crear la nueva asistencia
        const nuevaAsistencia = new Asistencias(data);
        return this.asistenciasRepository.crear(nuevaAsistencia);
    }

    private async validarRelaciones(data: ICrearAsistenciaIn): Promise<void> {
        const usuarioExiste = await this.asistenciasRepository.existeUsuario(data.id_usuario);
        if (!usuarioExiste) {
            throw new NotFoundException('Usuario no encontrado', `No se encontró el usuario con ID ${data.id_usuario}`);
        }

        const eventoExiste = await this.asistenciasRepository.existeEvento(data.id_evento);
        if (!eventoExiste) {
            throw new NotFoundException('Evento no encontrado', `No se encontró el evento con ID ${data.id_evento}`);
        }
    }
}
