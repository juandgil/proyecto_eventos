import dotenv from 'dotenv';
import validateEnvs from './Validate';
import getEnvFile from './EnvFile';

const isTestingJestEnv = process.env.NODE_ENV === 'test';

dotenv.config({
    path: getEnvFile(),
});

const ENV = {
    JWT_SECRET: process.env.JWT_SECRET || 'tu_clave_secreta',
    POSTGRES_HOST: process.env.POSTGRES_HOST || 'localhost',
    DOMAIN: process.env.DOMAIN || 'domain',
    SERVICE_NAME: process.env.SERVICE_NAME || 'proyecto-events',
    PROJECT_ID: process.env.PROJECT_ID || 'test-senior-developer',
    ENV: process.env.ENV || 'local',
    PG_PORT: process.env.PG_PORT || '5432',
    POSTGRES_USER: process.env.POSTGRES_USER || 'postgres',
    POSTGRES_PASS: process.env.POSTGRES_PASS || '123456',
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE || 'eventos',
    PORT: process.env.PORT || '8081',
    PREFIX_LOGGER: process.env.PREFIX_LOGGER || 'logg',
    LOGGER_LEVEL: process.env.LOGGER_LEVEL || 'false',
    MAPBOX_ACCESS_TOKEN:
        process.env.MAPBOX_ACCESS_TOKEN ||
        'pk.eyJ1IjoianVhbmdpbG1hcGJveCIsImEiOiJjbTFzd3VkbmYwYW44MmtvZHhmdjdubnJtIn0.IP53IzbaUO5OUWMPczGlaw',
};

if (!isTestingJestEnv) validateEnvs(ENV);

export default ENV;
