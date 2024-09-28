import ENV from '@common/envs/Envs';
import pgPromise, { IMain, IDatabase } from 'pg-promise';
import { IConnectionParameters } from 'pg-promise/typescript/pg-subset';

const configuracionesBD: IConnectionParameters = {
    host: ENV.POSTGRES_HOST,
    port: +ENV.PG_PORT,
    user: ENV.POSTGRES_USER,
    password: ENV.POSTGRES_PASS,
    database: 'configuraciones',
    connectionTimeoutMillis: 10000000,
    max: 30,
    idleTimeoutMillis: 30000000,
    query_timeout: 25000000,
};

const pgp: IMain = pgPromise();
pgp.pg.types.setTypeParser(pgp.pg.types.builtins.NUMERIC, (value: string) => parseFloat(value));

const connectionCache: { [tenantId: string]: IDatabase<IMain> } = {};

const connectToConfiguracionesDB = (): IDatabase<IMain> => {
    if (!connectionCache.configuraciones) {
        connectionCache.configuraciones = pgp(configuracionesBD);
    }
    return connectionCache.configuraciones;
};

export default connectToConfiguracionesDB;
