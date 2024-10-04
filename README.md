# Proyecto Eventos

Este repositorio contiene una API RESTful en Fastify para la gestión de eventos, utilizando Docker y una base de datos relacional PostgreSQL.

intenta seguir el patron de diseño de clean architecture.

su desarrollo se centra en la calidad del codigo y la arquitectura.

se valoro mas la calidad del codigo que la cantidad de funcionalidades.

existen test unitario con jest para cada modulo.

la cobertura es completa para cada modulo.

existe una carpeta con el modelo de base de datos en bd/ddl.sql y bd/dml.sql

existe una carpeta docs con las pruebas reales efectuadas con el pluguin Rest Client en la carpeta docs/test.http

## Documentación en swagger

en la ruta /domain/proyecto-events/docs/ se encuentra la documentacion de la api con swagger.

## Pruebas unitarias
la ruta a junit se encuentra en la ruta /domain/proyecto-events/coverage/lcov-report/index.html

## Pruebas y Cobertura

Para ejecutar las pruebas:

```bash
docker-compose exec app yarn test
```

Para generar el informe de cobertura:

```bash
docker-compose exec app yarn coverage
```

```bash
docker-compose exec app yarn coverage
```

Contiene un endpoint que consume la API de Mapbox para obtener ubicaciones cercanas con solo pasar una dirección fisica en un rango de 1 kilometro.
tener en cuenta que se debe tener una clave de acceso de mapbox en el archivo .env

## Requisitos previos

- [Node.js](https://nodejs.org/) (versión LTS)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Instalación y configuración

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/juandgil/proyecto_eventos.git
   cd proyecto-eventos
   ```

2. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```
   POSTGRES_HOST=db
   DOMAIN='domain'
   SERVICE_NAME='proyecto-events'
   PROJECT_ID='test-senior-developer'
   ENV='local'
   PG_PORT=5432
   POSTGRES_USER=postgres
   POSTGRES_PASS=123456
   POSTGRES_DATABASE=eventos
   PORT=8081
   PREFIX_LOGGER='PREFIX'
   LOGGER_LEVEL='debug'
   JWT_SECRET='tu_clave_secreta'
   MAPBOX_TOKEN='tu_token_de_mapbox'
   ```

3. Construir y ejecutar los contenedores:
   ```bash
   docker-compose up --build
   ```

4. Una vez que los contenedores estén en ejecución, la aplicación estará disponible en `http://localhost:8081/domain/proyecto-events`.

    puedes usar los archivos

    docs/Asistencias.http,
    docs/Eventos.http,
    docs/Usuarios.http,
    docs/Perfiles.http,
    docs/CategoriasEventos.http,
    docs/Ubicaciones.http

    para probar las funcionalidades

    y la documentacion de la api con swagger en

    http://localhost:8081/domain/proyecto-events/docs


## Configuración de la base de datos

1. Crear las tablas:
   ```bash
   docker-compose exec db psql -U postgres -d eventos -f /db/DDL.sql
   ```

2. Insertar datos iniciales:
   ```bash
   docker-compose exec db psql -U postgres -d eventos -f /db/DML.sql
   ```

3. Verificar la creación de tablas:
   ```bash
   docker-compose exec db psql -U postgres -d eventos -c "\dt"
   ```

## Desarrollo

- Para ver los logs de la aplicación en tiempo real:
  ```bash
  docker-compose logs -f app
  ```

- Para ejecutar comandos dentro del contenedor (ej. instalar nuevas dependencias):
  ```bash
  docker-compose exec app yarn add <package-name>
  ```

## Pruebas

Para ejecutar las pruebas:
bash
docker-compose exec app yarn test


Para detener y eliminar los contenedores y volúmenes:
## Detener y limpiar

Para detener y eliminar los contenedores y volúmenes:
bash
docker-compose down -v

## Modelo de base de datos
mermaid
erDiagram
PERFILES ||--o{ USUARIOS : tiene
USUARIOS ||--o{ EVENTOS : crea
USUARIOS ||--o{ ASISTENCIAS : participa
EVENTOS ||--o{ ASISTENCIAS : tiene
EVENTOS }|--|| UBICACIONES : se_realiza_en
EVENTOS }|--|| CATEGORIAS_EVENTOS : pertenece_a
PERFILES {
int id_perfil PK
string nombre
string descripcion
datetime creado_en
datetime actualizado_en
}
USUARIOS {
int id_usuario PK
string nombre_usuario
string correo
string hash_contrasena
int id_perfil FK
boolean activo
datetime creado_en
datetime actualizado_en
}
EVENTOS {
int id_evento PK
string titulo
string descripcion
datetime fecha_inicio
datetime fecha_fin
int id_creador FK
int id_ubicacion FK
int id_categoria FK
datetime creado_en
datetime actualizado_en
}
ASISTENCIAS {
int id_asistencia PK
int id_usuario FK
int id_evento FK
datetime creado_en
}
UBICACIONES {
int id_ubicacion PK
string nombre
string direccion
decimal latitud
decimal longitud
datetime creado_en
datetime actualizado_en
}
CATEGORIAS_EVENTOS {
int id_categoria PK
string nombre
datetime creado_en
datetime actualizado_en
}

## Scripts útiles

- `yarn build`: Compila el proyecto
- `yarn lint`: Ejecuta el linter
- `yarn format`: Formatea el código
- `yarn dev`: Inicia el servidor en modo desarrollo
- `yarn start`: Inicia el servidor
- `yarn test`: Ejecuta las pruebas
- `yarn coverage`: Muestra la cobertura de pruebas

## Convención de commits

Este proyecto sigue la [Convención de Mensajes de Commit](https://www.conventionalcommits.org/).
