import { injectable, inject } from 'inversify';
import NotFoundException from '@common/http/exceptions/NotFoundException';
import { CategoriasRepository } from '../../domain/repositories/CategoriasRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';

@injectable()
export default class EliminarCategoriaUseCase {
    constructor(@inject(TYPESDEPENDENCIES.CategoriasRepository) private categoriasRepository: CategoriasRepository) {}

    async execute(idCategoria: number): Promise<void> {
        const categoriaExistente = await this.categoriasRepository.consultar(idCategoria);
        if (!categoriaExistente) {
            throw new NotFoundException('Categoría no encontrada', `No se encontró la categoría con ID ${idCategoria}`);
        }

        await this.categoriasRepository.eliminar(idCategoria);
    }
}
