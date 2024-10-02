import { injectable, inject } from 'inversify';
import BadMessageException from '@common/http/exceptions/BadMessageException';
import NotFoundException from '@common/http/exceptions/NotFoundException';
import { EventosRepository } from '../../domain/repositories/EventosRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import Eventos from '../../domain/entities/Eventos';
import { ICrearEventoIn } from '../dto/in/IEventosIn';

@injectable()
export default class CrearEventoUseCase {
    constructor(@inject(TYPESDEPENDENCIES.EventosRepository) private eventosRepository: EventosRepository) {}

    async execute(data: ICrearEventoIn): Promise<Eventos> {
        // Validar que no exista un evento con el mismo título
        const eventoExistente = await this.eventosRepository.buscarPorTitulo(data.titulo);
        if (eventoExistente && eventoExistente.length > 0) {
            throw new BadMessageException('Evento ya existe', 'Ya existe un evento con el mismo título');
        }

        // Validar que la fecha de inicio sea anterior a la fecha de fin
        if (data.fecha_inicio >= data.fecha_fin) {
            throw new BadMessageException('Fechas inválidas', 'La fecha de inicio debe ser anterior a la fecha de fin');
        }

        // Validar que el creador, la ubicación y la categoría existan
        await this.validarRelaciones(data);

        // Crear el nuevo evento
        const nuevoEvento = new Eventos(data);
        return this.eventosRepository.crear(nuevoEvento);
    }

    private async validarRelaciones(data: ICrearEventoIn): Promise<void> {
        const creadorExiste = await this.eventosRepository.existeCreador(data.id_creador);
        if (!creadorExiste) {
            throw new NotFoundException('Creador no encontrado', `No se encontró el creador con ID ${data.id_creador}`);
        }

        const ubicacionExiste = await this.eventosRepository.existeUbicacion(data.id_ubicacion);
        if (!ubicacionExiste) {
            throw new NotFoundException(
                'Ubicación no encontrada',
                `No se encontró la ubicación con ID ${data.id_ubicacion}`,
            );
        }

        const categoriaExiste = await this.eventosRepository.existeCategoria(data.id_categoria);
        if (!categoriaExiste) {
            throw new NotFoundException(
                'Categoría no encontrada',
                `No se encontró la categoría con ID ${data.id_categoria}`,
            );
        }
    }
}
