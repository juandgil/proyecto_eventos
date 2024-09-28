FROM node:18

# Instalar PostgreSQL
RUN apt-get update && apt-get install -y postgresql postgresql-contrib

# Configurar PostgreSQL
USER postgres

# Iniciar PostgreSQL y configurar el usuario y la base de datos
RUN /etc/init.d/postgresql start && \
    psql --command "ALTER USER postgres WITH PASSWORD '${POSTGRES_PASS:-123456}';" && \
    createdb -O postgres ${POSTGRES_DATABASE:-eventos} && \
    echo "host all all 0.0.0.0/0 md5" >> /etc/postgresql/15/main/pg_hba.conf && \
    echo "listen_addresses='*'" >> /etc/postgresql/15/main/postgresql.conf && \
    /etc/init.d/postgresql stop

USER root

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8081

# Script para iniciar PostgreSQL y la aplicación
COPY start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
