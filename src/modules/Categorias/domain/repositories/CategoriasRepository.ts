import Categorias from '../entities/Categorias';

export interface CategoriasRepository {
    crear(categoria: Categorias): Promise<Categorias>;
    actualizar(id: number, nombre: string): Promise<Categorias>;
    eliminar(id: number): Promise<void>;
    consultar(id: number): Promise<Categorias | null>;
    listar(): Promise<Categorias[]>;
    buscarPorNombre(nombre: string): Promise<Categorias[]>;
}
