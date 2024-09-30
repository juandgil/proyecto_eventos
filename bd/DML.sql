-- Insertar perfiles
INSERT INTO Perfiles (nombre, descripcion) VALUES
('Usuario Regular', 'Usuario estándar con acceso básico'),
('Organizador', 'Usuario con permisos para crear y gestionar eventos');

-- Insertar usuarios de ejemplo
INSERT INTO Usuarios (nombre_usuario, correo, hash_contrasena, perfil_id) VALUES
('juan_perez', 'juan@ejemplo.com', 'hash_contrasena_1', 1),
('maria_garcia', 'maria@ejemplo.com', 'hash_contrasena_2', 2);

-- Insertar categorías de eventos
INSERT INTO Categorias_Eventos (nombre) VALUES
('Concierto'),
('Conferencia'),
('Taller');

-- Insertar ubicaciones
INSERT INTO Ubicaciones (nombre, direccion, latitud, longitud) VALUES
('Teatro Principal', 'Calle Mayor 1, Ciudad', 40.4168, -3.7038),
('Centro de Convenciones', 'Avenida Central 123, Ciudad', 40.4000, -3.7100);

-- Insertar eventos
INSERT INTO Eventos (titulo, descripcion, fecha_inicio, fecha_fin, creador_id, ubicacion_id, categoria_id) VALUES
('Concierto de Rock', 'Gran concierto de rock con bandas locales', '2024-06-15 20:00:00', '2024-06-15 23:00:00', 1, 1, 1),
('Conferencia de Tecnología', 'Conferencia sobre las últimas tendencias en IA', '2024-07-10 09:00:00', '2024-07-10 18:00:00', 2, 2, 2);

-- Registrar asistencias
INSERT INTO Asistencias (usuario_id, evento_id) VALUES
(1, 2),
(2, 1);
