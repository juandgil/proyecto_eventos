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
