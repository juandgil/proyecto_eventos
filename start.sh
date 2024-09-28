#!/bin/bash
service postgresql start
su - postgres -c "psql -c \"ALTER USER postgres WITH PASSWORD '${POSTGRES_PASS:-123456}';\""
yarn start
