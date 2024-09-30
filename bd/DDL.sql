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
