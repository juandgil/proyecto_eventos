import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import TYPESDEPENDENCIES from '@common/dependencies/TypesDependencies';
import PostgresException from '@common/http/exceptions/PostgresException';
import { logger } from '@common/logger';
import { ClientesRepository } from '@modules/Usuarioas/domain/repositories/ClientesRepository';
import { injectable } from 'inversify';
import { IDatabase, IMain } from 'pg-promise';
import Clientes from '@modules/Usuarioas/domain/entities/Clientes';

@injectable()
export default class PostgresClientesRepository implements ClientesRepository {
    get db(): IDatabase<IMain> {
        return DEPENDENCY_CONTAINER.get<IDatabase<IMain>>(TYPESDEPENDENCIES.dbConfiguraciones);
    }

    schema = '"public"';

    async consultarPorCodigoClienteSuite(codigoClienteSuite: number): Promise<Clientes | null> {
        try {
            const sqlQuery = `SELECT * FROM clientes WHERE codigo_cliente_suite = $/codigoClienteSuite/ LIMIT 1`;
            const cliente = await this.db.oneOrNone(sqlQuery, { codigoClienteSuite });
            return cliente ? new Clientes(cliente) : null;
        } catch (error) {
            logger.error('CLIENTES', '798779654317', [`Error consultando cliente: ${error.message}`]);
            throw new PostgresException(500, `Error en la consulta de postgres: ${error.message}`);
        }
    }
}
