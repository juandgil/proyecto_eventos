import { Container } from 'inversify';
import connectToConfiguracionesDB from '@infrastructure/bd/adapter/Config';
import { IDatabase, IMain } from 'pg-promise';
import TYPESDEPENDENCIES from '@common/dependencies/TypesDependencies';

export const DEPENDENCY_CONTAINER = new Container();

export const globalDependencies = (): void => {
    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPESDEPENDENCIES.dbConfiguraciones).toConstantValue(
        connectToConfiguracionesDB(),
    );
};
