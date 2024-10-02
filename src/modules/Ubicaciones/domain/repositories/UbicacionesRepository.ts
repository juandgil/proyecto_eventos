import Ubicaciones from '../entities/Ubicaciones';

export interface UbicacionesRepository {
    crear(ubicacion: Ubicaciones): Promise<Ubicaciones>;
    actualizar(id: number, ubicacion: Ubicaciones): Promise<Ubicaciones>;
    eliminar(id: number): Promise<void>;
    consultar(id: number): Promise<Ubicaciones | null>;
    listar(): Promise<Ubicaciones[]>;
    buscarPorNombre(nombre: string): Promise<Ubicaciones[]>;
}
