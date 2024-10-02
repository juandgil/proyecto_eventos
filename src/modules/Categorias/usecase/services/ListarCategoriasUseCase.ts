import { injectable, inject } from 'inversify';
import { CategoriasRepository } from '../../domain/repositories/CategoriasRepository';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';
import Categorias from '../../domain/entities/Categorias';

@injectable()
export default class ListarCategoriasUseCase {
    constructor(@inject(TYPESDEPENDENCIES.CategoriasRepository) private categoriasRepository: CategoriasRepository) {}

    async execute(): Promise<Categorias[]> {
        return this.categoriasRepository.listar();
    }
}
