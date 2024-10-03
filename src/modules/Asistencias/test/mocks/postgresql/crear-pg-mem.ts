import { newDb } from 'pg-mem';
import { IMain, IDatabase } from 'pg-promise';
import { logger } from '@common/logger';

const createMemoryDB = (): IDatabase<IMain> => {
    const dbmem = newDb();

    dbmem.registerLanguage('plpgsql', () => () => ({}));

    try {
        dbmem.public.none(`
            CREATE TABLE IF NOT EXISTS public.perfiles (
                id_perfil SERIAL PRIMARY KEY,
                nombre VARCHAR(50) UNIQUE NOT NULL,
                descripcion TEXT
            );

            CREATE TABLE IF NOT EXISTS public.usuarios (
                id_usuario SERIAL PRIMARY KEY,
                nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
                correo VARCHAR(100) UNIQUE NOT NULL,
                hash_contrasena VARCHAR(255) NOT NULL,
                id_perfil INTEGER REFERENCES public.perfiles(id_perfil),
                activo BOOLEAN DEFAULT TRUE
            );

            CREATE TABLE IF NOT EXISTS public.categorias_eventos (
                id_categoria SERIAL PRIMARY KEY,
                nombre VARCHAR(50) UNIQUE NOT NULL
            );

            CREATE TABLE IF NOT EXISTS public.ubicaciones (
                id_ubicacion SERIAL PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                direccion VARCHAR(255) NOT NULL,
                latitud FLOAT NOT NULL,
                longitud FLOAT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS public.eventos (
                id_evento SERIAL PRIMARY KEY,
                titulo VARCHAR(100) NOT NULL,
                descripcion TEXT,
                fecha_inicio TIMESTAMP NOT NULL,
                fecha_fin TIMESTAMP NOT NULL,
                id_creador INTEGER REFERENCES public.usuarios(id_usuario),
                id_ubicacion INTEGER REFERENCES public.ubicaciones(id_ubicacion),
                id_categoria INTEGER REFERENCES public.categorias_eventos(id_categoria)
            );

            CREATE TABLE IF NOT EXISTS public.asistencias (
                id_asistencia SERIAL PRIMARY KEY,
                id_usuario INTEGER REFERENCES public.usuarios(id_usuario),
                id_evento INTEGER REFERENCES public.eventos(id_evento),
                creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(id_usuario, id_evento)
            );

            -- Insertar datos de prueba
            INSERT INTO public.perfiles (id_perfil, nombre, descripcion) VALUES
            (1, 'Usuario Regular', 'Usuario estándar con acceso básico'),
            (2, 'Organizador', 'Usuario con permisos para crear y gestionar eventos'),
            (3, 'Administrador', 'Usuario con acceso completo al sistema')
            ON CONFLICT (id_perfil) DO NOTHING;

            INSERT INTO public.usuarios (id_usuario, nombre_usuario, correo, hash_contrasena, id_perfil) VALUES
            (1, 'usuario_test', 'test@example.com', 'hash_password', 1),
            (2, 'organizador_test', 'organizador@example.com', 'hash_password', 2)
            ON CONFLICT (id_usuario) DO NOTHING;

            INSERT INTO public.categorias_eventos (id_categoria, nombre) VALUES
            (1, 'Categoría de prueba 1'),
            (2, 'Categoría de prueba 2')
            ON CONFLICT (id_categoria) DO NOTHING;

            INSERT INTO public.ubicaciones (id_ubicacion, nombre, direccion, latitud, longitud) VALUES
            (1, 'Ubicación de prueba 1', 'Dirección 1', 0, 0),
            (2, 'Ubicación de prueba 2', 'Dirección 2', 0, 0)
            ON CONFLICT (id_ubicacion) DO NOTHING;

            -- Insertar datos de prueba para eventos
            INSERT INTO public.eventos (id_evento, titulo, descripcion, fecha_inicio, fecha_fin, id_creador, id_ubicacion, id_categoria)
            VALUES
            (1, 'Evento de prueba 1', 'Descripción del evento 1', '2023-06-01 10:00:00', '2023-06-01 12:00:00', 2, 1, 1),
            (2, 'Evento de prueba 2', 'Descripción del evento 2', '2023-06-02 14:00:00', '2023-06-02 16:00:00', 2, 2, 2)
            ON CONFLICT (id_evento) DO NOTHING;
        `);
    } catch (error) {
        logger.error('TEST', '182946189264', [`Error creando la base de datos: ${error}`]);
        throw error;
    }

    return dbmem.adapters.createPgPromise();
};

let asistenciasDB: IDatabase<IMain>;

export const mockConfiguracionesDB = (): IDatabase<IMain> => {
    if (!asistenciasDB) {
        asistenciasDB = createMemoryDB();
    }
    return asistenciasDB;
};

export default mockConfiguracionesDB;
