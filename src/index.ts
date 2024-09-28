import 'module-alias/register';
import 'reflect-metadata';
import ModulesFactory from '@common/modules/ModulesFactory';
import TYPESSERVER from '@infrastructure/app/server/TypeServer';
import UsuariosModules from '@modules/Usuarioas/UsuariosModule';
import PerfilesModule from '@modules/Perfiles/PerfilesModule';
import { globalDependencies } from '@common/dependencies/DependencyContainer';
import pgPromise from 'pg-promise';
import ENV from '@common/envs/Envs';

const pgp = pgPromise();

const connectWithRetry = async (retries = 5, delay = 5000) => {
    while (retries) {
        try {
            const db = pgp({
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.PG_PORT),
                database: process.env.POSTGRES_DATABASE,
                user: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASS,
            });

            await db.connect();
            console.log('Conexión a la base de datos establecida');
            return db;
        } catch (err) {
            console.log(`Error al conectar con la base de datos. Reintentando en ${delay/1000} segundos...`);
            retries -= 1;
            await new Promise(res => setTimeout(res, delay));
        }
    }
    throw new Error('No se pudo conectar a la base de datos después de múltiples intentos');
};

const connectDB = async () => {
    return await connectWithRetry();
};

async function bootstrap() {
    const dbConnection = await connectDB();
    const modulesFactory = new ModulesFactory();
    const server = modulesFactory.createServer(TYPESSERVER.Fastify);
    globalDependencies();
    modulesFactory.initModules([UsuariosModules, PerfilesModule]);

    // Ejemplo de uso de la base de datos
    try {
        const result = await dbConnection.one('SELECT NOW()');
        console.log('Conexión a la base de datos exitosa:', result.now);
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }

    server?.start();
}

bootstrap();
