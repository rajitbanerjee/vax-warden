#!/bin/bash

cd backend
./mvnw clean install
cd ..

docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up
