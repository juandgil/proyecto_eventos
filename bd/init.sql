-- Crear tablas
-- Crear tabla de Perfiles
CREATE TABLE Perfiles (
    id_perfil SERIAL,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT perfiles_pk PRIMARY KEY (id_perfil),
    CONSTRAINT perfiles_nombre_unique UNIQUE (nombre)
);

-- Creación de la tabla Usuarios
CREATE TABLE Usuarios (
    id_usuario SERIAL,
    nombre_usuario VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    hash_contrasena VARCHAR(255) NOT NULL,
    id_perfil INTEGER,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    CONSTRAINT usuarios_pk PRIMARY KEY (id_usuario),
    CONSTRAINT usuarios_nombre_usuario_unique UNIQUE (nombre_usuario),
    CONSTRAINT usuarios_correo_unique UNIQUE (correo),
    CONSTRAINT usuarios_perfiles_fk FOREIGN KEY (id_perfil) REFERENCES Perfiles(id_perfil)
);

-- Creación de la tabla Categorias_Eventos
CREATE TABLE Categorias_Eventos (
    id_categoria SERIAL,
    nombre VARCHAR(50) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT categorias_eventos_pk PRIMARY KEY (id_categoria),
    CONSTRAINT categorias_eventos_nombre_unique UNIQUE (nombre)
);

-- Creación de la tabla Ubicaciones
CREATE TABLE Ubicaciones (
    id_ubicacion SERIAL,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    latitud DECIMAL(10, 8) NOT NULL,
    longitud DECIMAL(11, 8) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ubicaciones_pk PRIMARY KEY (id_ubicacion)
);

-- Creación de la tabla Eventos
CREATE TABLE Eventos (
    id_evento SERIAL,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_inicio TIMESTAMP NOT NULL,
    fecha_fin TIMESTAMP NOT NULL,
    id_creador INTEGER,
    id_ubicacion INTEGER,
    id_categoria INTEGER,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT eventos_pk PRIMARY KEY (id_evento),
    CONSTRAINT eventos_usuarios_fk FOREIGN KEY (id_creador) REFERENCES Usuarios(id_usuario),
    CONSTRAINT eventos_ubicaciones_fk FOREIGN KEY (id_ubicacion) REFERENCES Ubicaciones(id_ubicacion),
    CONSTRAINT eventos_categorias_fk FOREIGN KEY (id_categoria) REFERENCES Categorias_Eventos(id_categoria)
);

-- Creación de la tabla Asistencias
CREATE TABLE Asistencias (
    id_asistencia SERIAL,
    id_usuario INTEGER,
    id_evento INTEGER,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT asistencias_pk PRIMARY KEY (id_asistencia),
    CONSTRAINT asistencias_usuarios_fk FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    CONSTRAINT asistencias_eventos_fk FOREIGN KEY (id_evento) REFERENCES Eventos(id_evento),
    CONSTRAINT asistencias_usuario_evento_unique UNIQUE(id_usuario, id_evento)
);

-- Insertar datos de ejemplo
-- Insertar perfiles
INSERT INTO Perfiles (nombre, descripcion) VALUES
('Usuario Regular', 'Usuario estándar con acceso básico'),
('Organizador', 'Usuario con permisos para crear y gestionar eventos'),
('Administrador', 'Usuario con acceso completo al sistema');

-- Insertar usuarios de ejemplo
INSERT INTO Usuarios (nombre_usuario, correo, hash_contrasena, id_perfil) VALUES
('juan_perez', 'juan@ejemplo.com', 'hash_contrasena_1', 1),
('maria_garcia', 'maria@ejemplo.com', 'hash_contrasena_2', 2),
('admin_principal', 'admin@ejemplo.com', 'hash_contrasena_3', 3);

-- Insertar categorías de eventos
INSERT INTO Categorias_Eventos (nombre) VALUES
('Concierto'),
('Conferencia'),
('Taller'),
('Exposición'),
('Deportivo');

-- Insertar ubicaciones
INSERT INTO Ubicaciones (nombre, direccion, latitud, longitud) VALUES
('Teatro Principal', 'Calle Mayor 1, Ciudad', 40.4168, -3.7038),
('Centro de Convenciones', 'Avenida Central 123, Ciudad', 40.4000, -3.7100),
('Parque Municipal', 'Calle del Parque 45, Ciudad', 40.4100, -3.7200),
('Estadio Olímpico', 'Avenida del Deporte 78, Ciudad', 40.4200, -3.7300);

-- Insertar eventos
INSERT INTO Eventos (titulo, descripcion, fecha_inicio, fecha_fin, id_creador, id_ubicacion, id_categoria) VALUES
('Concierto de Rock', 'Gran concierto de rock con bandas locales', '2024-06-15 20:00:00', '2024-06-15 23:00:00', 2, 1, 1),
('Conferencia de Tecnología', 'Conferencia sobre las últimas tendencias en IA', '2024-07-10 09:00:00', '2024-07-10 18:00:00', 2, 2, 2),
('Taller de Pintura', 'Aprende técnicas de pintura al óleo', '2024-08-05 15:00:00', '2024-08-05 18:00:00', 2, 3, 3),
('Exposición de Arte Moderno', 'Muestra de artistas contemporáneos', '2024-09-01 10:00:00', '2024-09-30 20:00:00', 2, 2, 4),
('Maratón de la Ciudad', 'Carrera anual por las calles de la ciudad', '2024-10-12 07:00:00', '2024-10-12 14:00:00', 2, 4, 5);

-- Registrar asistencias
INSERT INTO Asistencias (id_usuario, id_evento) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 3),
(3, 2),
(3, 4),
(3, 5);
