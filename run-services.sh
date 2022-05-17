#!/bin/bash

num_args=$#

mkcert -install
mkdir ./frontend/.cert
# generate frontend certificate
mkcert -key-file ./frontend/.cert/key.pem -cert-file ./frontend/.cert/cert.pem "localhost"
# generate backend p12 certificate from frontend certificate
openssl pkcs12 -inkey ./frontend/.cert/key.pem -in ./frontend/.cert/cert.pem -export -passout pass:vax-warden -out ./backend/src/main/resources/cert.pfx

if [[ $num_args -eq 1 && "$1" == "--clean" ]]; then
    ./mvnw clean install
else
    ./mvnw install
fi

if [[ $? -eq 0 ]]; then
  docker-compose down --remove-orphans
  docker-compose build --no-cache
  docker-compose up
fi
