#!/bin/bash

num_args=$#

if [[ $num_args -eq 1 && "$1" == "--clean" ]]; then
    ./mvnw clean install
else
    ./mvnw install
fi

docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up
