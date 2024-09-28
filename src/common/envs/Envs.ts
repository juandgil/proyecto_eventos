import dotenv from 'dotenv';
import validateEnvs from './Validate';
import getEnvFile from './EnvFile';

const isTestingJestEnv = process.env.NODE_ENV === 'test';

dotenv.config({
    path: getEnvFile(),
});

const ENV = {
    POSTGRES_HOST: process.env.POSTGRES_HOST || 'dbcmtest.loc',
    DOMAIN: process.env.DOMAIN || 'wms',
    SERVICE_NAME: process.env.SERVICE_NAME || 'proyecto-events',
    PROJECT_ID: process.env.PROJECT_ID || 'product-wms-dev',
    ENV: process.env.ENV || 'local',
    PG_PORT: process.env.PG_PORT || '5432',
    POSTGRES_USER: process.env.POSTGRES_USER || 'userwms',
    POSTGRES_PASS: process.env.POSTGRES_PASS || 'zBAaKtsErfM',
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE || 'wms',
    PORT: process.env.PORT || '8080',
    PREFIX_LOGGER: process.env.PREFIX_LOGGER || 'wms',
    LOGGER_LEVEL: process.env.LOGGER_LEVEL || 'false',
};

if (!isTestingJestEnv) validateEnvs(ENV);

export default ENV;
