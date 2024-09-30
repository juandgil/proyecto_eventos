import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';

import PostgresPerfilesRepository from '@infrastructure/bd/dao/PostgresPerfilesRepository';

import TYPESDEPENDENCIES from './TypesDependencies';
import { PerfilesRepository } from '../domain/repositories/PerfilesRepository';

const createDependencies = (): void => {
    DEPENDENCY_CONTAINER.bind<PerfilesRepository>(TYPESDEPENDENCIES.PerfilesRepository)
        .to(PostgresPerfilesRepository)
        .inSingletonScope();
};

export default createDependencies;
