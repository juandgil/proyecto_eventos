import 'module-alias/register';
import 'reflect-metadata';
import ModulesFactory from '@common/modules/ModulesFactory';
import TYPESSERVER from '@infrastructure/app/server/TypeServer';
import UsuariosModules from '@modules/Usuarios/UsuariosModule';
import PerfilesModule from '@modules/Perfiles/PerfilesModule';
import { globalDependencies } from '@common/dependencies/DependencyContainer';
import pgPromise from 'pg-promise';
import ENV from '@common/envs/Envs';
import { logger } from '@common/logger/Logger';
import EventosModule from '@modules/eventos/EventosModule';
import UbicacionesModule from '@modules/Ubicaciones/UbicacionesModule';
import CategoriasModule from '@modules/Categorias/CategoriasModule';

const pgp = pgPromise();

const esperar = (ms: number): Promise<void> =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });

const conexionConReintentos = async (intentos = 5, delay = 5000) => {
    const attempts = Array.from({ length: intentos }, (_, i) => i);

    return Promise.any(
        attempts.map(async (i) => {
            try {
                const db = pgp({
                    host: ENV.POSTGRES_HOST,
                    port: Number(ENV.PG_PORT),
                    database: ENV.POSTGRES_DATABASE,
                    user: ENV.POSTGRES_USER,
                    password: ENV.POSTGRES_PASS,
                });

                await db.connect();
                console.log('Conexión a la base de datos establecida');
                return db;
            } catch (err) {
                console.log(`Error al conectar con la base de datos. Reintento ${i + 1} de ${intentos}`);
                if (i < intentos - 1) {
                    await esperar(delay);
                }
                throw err; // Necesario para que Promise.any() continúe con el siguiente intento
            }
        }),
    ).catch(() => {
        logger.info('index', 'conexionConReintentos', [
            `No se pudo conectar a la base de datos después de múltiples intentos`,
        ]);
        //throw new Error('No se pudo conectar a la base de datos después de múltiples intentos');
    });
};

async function bootstrap() {
    const dbConnection = await conexionConReintentos();
    const modulesFactory = new ModulesFactory();
    const server = modulesFactory.createServer(TYPESSERVER.Fastify);
    globalDependencies();
    modulesFactory.initModules([UsuariosModules, PerfilesModule, CategoriasModule, UbicacionesModule, EventosModule]);

    if (dbConnection) {
        try {
            const result = await dbConnection.any('SELECT NOW()');
            console.log('Conexión a la base de datos exitosa:', result[0].now);
        } catch (error) {
            console.error('Error al conectar con la base de datos:', error);
        }
    }

    server?.start();
}

bootstrap();
