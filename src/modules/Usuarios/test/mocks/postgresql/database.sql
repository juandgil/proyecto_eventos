-- Crear tabla de Perfiles
CREATE TABLE public.perfiles (
    id_perfil SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL,
    descripcion TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar perfiles de prueba
INSERT INTO public.perfiles (nombre, descripcion) VALUES
    ('Usuario Regular', 'Usuario estándar con acceso básico'),
    ('Organizador', 'Usuario con permisos para crear y gestionar eventos'),
    ('Administrador', 'Usuario con acceso completo al sistema');

-- Crear tabla de Usuarios
CREATE TABLE public.usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    hash_contrasena VARCHAR(255) NOT NULL,
    id_perfil INTEGER REFERENCES public.perfiles(id_perfil),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar usuarios de prueba
INSERT INTO public.usuarios (nombre_usuario, correo, hash_contrasena, id_perfil) VALUES
    ('usuario_test1', 'test1@ejemplo.com', 'hash_contrasena_1', 1),
    ('usuario_test2', 'test2@ejemplo.com', 'hash_contrasena_2', 2),
    ('admin_test', 'admin@ejemplo.com', 'hash_contrasena_3', 3);

-- Crear tabla de Categorías de Eventos
CREATE TABLE public.categorias_eventos (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar categorías de eventos de prueba
INSERT INTO public.categorias_eventos (nombre) VALUES
    ('Concierto'),
    ('Conferencia'),
    ('Taller');

-- Crear tabla de Ubicaciones
CREATE TABLE public.ubicaciones (
    id_ubicacion SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    latitud FLOAT NOT NULL,
    longitud FLOAT NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar ubicaciones de prueba
INSERT INTO public.ubicaciones (nombre, direccion, latitud, longitud) VALUES
    ('Lugar de Prueba 1', 'Dirección de Prueba 1', 40.4168, -3.7038),
    ('Lugar de Prueba 2', 'Dirección de Prueba 2', 40.4000, -3.7100);

-- Crear tabla de Eventos
CREATE TABLE public.eventos (
    id_evento SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_inicio TIMESTAMP NOT NULL,
    fecha_fin TIMESTAMP NOT NULL,
    id_creador INTEGER REFERENCES public.usuarios(id_usuario),
    id_ubicacion INTEGER REFERENCES public.ubicaciones(id_ubicacion),
    id_categoria INTEGER REFERENCES public.categorias_eventos(id_categoria),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar eventos de prueba
INSERT INTO public.eventos (titulo, descripcion, fecha_inicio, fecha_fin, id_creador, id_ubicacion, id_categoria) VALUES
    ('Evento de Prueba 1', 'Descripción del evento de prueba 1', '2024-06-15 20:00:00', '2024-06-15 23:00:00', 2, 1, 1),
    ('Evento de Prueba 2', 'Descripción del evento de prueba 2', '2024-07-10 09:00:00', '2024-07-10 18:00:00', 2, 2, 2);

-- Crear tabla de Asistencias
CREATE TABLE public.asistencias (
    id_asistencia SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES public.usuarios(id_usuario),
    id_evento INTEGER REFERENCES public.eventos(id_evento),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(id_usuario, id_evento)
);

-- Insertar asistencias de prueba
INSERT INTO public.asistencias (id_usuario, id_evento) VALUES
    (1, 1),
    (1, 2),
    (2, 1);
