import { injectable, inject } from 'inversify';
import NotFoundException from '@common/http/exceptions/NotFoundException';
import BadMessageException from '@common/http/exceptions/BadMessageException';
import { CategoriasRepository } from '../../domain/repositories/CategoriasRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import Categorias from '../../domain/entities/Categorias';
import { IActualizarCategoriaIn } from '../dto/in/ICategoriasIn';

@injectable()
export default class ActualizarCategoriaUseCase {
    constructor(@inject(TYPESDEPENDENCIES.CategoriasRepository) private categoriasRepository: CategoriasRepository) {}

    async execute(data: IActualizarCategoriaIn): Promise<Categorias> {
        const categoriaExistente = await this.categoriasRepository.consultar(data.id_categoria);
        if (!categoriaExistente) {
            throw new NotFoundException(
                'Categoría no encontrada',
                `No se encontró la categoría con ID ${data.id_categoria}`,
            );
        }

        const categoriaConMismoNombre = await this.categoriasRepository.buscarPorNombre(data.nombre);
        if (
            categoriaConMismoNombre &&
            categoriaConMismoNombre.length > 0 &&
            categoriaConMismoNombre[0].id_categoria !== data.id_categoria
        ) {
            throw new BadMessageException(
                'Nombre de categoría duplicado',
                `Ya existe otra categoría con el nombre ${data.nombre}`,
            );
        }

        categoriaExistente.nombre = data.nombre;
        return this.categoriasRepository.actualizar(data.id_categoria, categoriaExistente.nombre);
    }
}
