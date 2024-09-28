import { IConnectionParameters } from 'pg-promise/typescript/pg-subset';

export interface ConexionesBD {
    [tenantId: string]: IConnectionParameters;
}
