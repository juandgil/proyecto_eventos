import { injectable, inject } from 'inversify';
import BadMessageException from '@common/http/exceptions/BadMessageException';
import { CategoriasRepository } from '@modules/Categorias/domain/repositories/CategoriasRepository';
import TYPESDEPENDENCIES from '@modules/Categorias/dependencies/TypesDependencies';
import Categorias from '@modules/Categorias/domain/entities/Categorias';
import { ICrearCategoriaIn } from '../dto/in/ICategoriasIn';

@injectable()
export default class CrearCategoriaUseCase {
    constructor(@inject(TYPESDEPENDENCIES.CategoriasRepository) private categoriasRepository: CategoriasRepository) {}

    async execute(data: ICrearCategoriaIn): Promise<Categorias> {
        const categoriaExistente = await this.categoriasRepository.buscarPorNombre(data.nombre);
        if (categoriaExistente && categoriaExistente.length > 0) {
            throw new BadMessageException('Categoría ya existe', 'Ya existe una categoría con el mismo nombre');
        }
        return this.categoriasRepository.crear(data);
    }
}
