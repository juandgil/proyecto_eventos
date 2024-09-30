import Clientes from '../entities/Clientes';

export interface ClientesRepository {
    consultarPorCodigoClienteSuite(consultarPorCodigoClienteSuite: number): Promise<Clientes | null>;
}
