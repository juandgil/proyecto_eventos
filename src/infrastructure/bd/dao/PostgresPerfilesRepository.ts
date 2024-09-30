import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import PostgresException from '@common/http/exceptions/PostgresException';
import { logger } from '@common/logger';
import TYPESDEPENDENCIES from '@common/dependencies/TypesDependencies';
import { PerfilesRepository } from '@modules/Perfiles/domain/repositories/PerfilesRepository';
import { IConstultarPerfilesOut } from '@modules/Perfiles/usecase/dto/out';

import { injectable } from 'inversify';
import { IDatabase, IMain } from 'pg-promise';
import Perfiles from '@modules/Perfiles/domain/entities/Perfiles';

@injectable()
export default class PostgresPerfilesRepository implements PerfilesRepository {
    get db(): IDatabase<IMain> {
        return DEPENDENCY_CONTAINER.get<IDatabase<IMain>>(TYPESDEPENDENCIES.db);
    }

    schema = '"public"';

    async consultarPorId(idPerfil: number): Promise<IConstultarPerfilesOut> {
        try {
            const sqlQuery = `SELECT * FROM perfiles WHERE id_perfil = $/idPerfil/ LIMIT 1`;
            const perfil = await this.db.oneOrNone(sqlQuery, { idPerfil });
            return perfil;
        } catch (error) {
            logger.error('PERFILES', '798779654316', [`Error consultando perfil: ${error.message}`]);
            throw new PostgresException(500, `Error en la consulta de postgres: ${error.message}`);
        }
    }

    async consultarMaestro(): Promise<Perfiles | null> {
        try {
            const sqlQuery = `SELECT * FROM perfiles WHERE es_maestro = true LIMIT 1`;
            const perfil = await this.db.oneOrNone(sqlQuery);
            return perfil ? new Perfiles(perfil) : null;
        } catch (error) {
            logger.error('PERFILES', '798779654316', [`Error consultando perfil: ${error.message}`]);
            throw new PostgresException(500, `Error en la consulta de postgres: ${error.message}`);
        }
    }
}
