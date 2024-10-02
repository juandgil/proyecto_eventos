import { injectable, inject } from 'inversify';
import NotFoundException from '@common/http/exceptions/NotFoundException';
import { CategoriasRepository } from '../../domain/repositories/CategoriasRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import Categorias from '../../domain/entities/Categorias';

@injectable()
export default class ConsultarCategoriaUseCase {
    constructor(@inject(TYPESDEPENDENCIES.CategoriasRepository) private categoriasRepository: CategoriasRepository) {}

    async execute(idCategoria: number): Promise<Categorias> {
        const categoria = await this.categoriasRepository.consultar(idCategoria);
        if (!categoria) {
            throw new NotFoundException('Categoría no encontrada', `No se encontró la categoría con ID ${idCategoria}`);
        }
        return categoria;
    }
}
