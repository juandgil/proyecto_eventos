export interface ProcesarExcelRepository {
    guardarArchivo(archivo: Buffer): Promise<string>;
    obtenerEstado(id: string): Promise<string>;
    actualizarEstado(id: string, estado: string): Promise<void>;
}
