#!/bin/bash

# Load the environment variables from the file
source .env

# Copy Backstage configuration file with placeholders
cp ./backstage/app-config.yaml.placeholder ./backstage/app-config.yaml

# File with Backstage configuration
backstage_config="./backstage/app-config.yaml"

# Update the YAML file with placeholders
sed -i "s|\${BACKSTAGE_HOSTNAME}|${BACKSTAGE_HOSTNAME}|g" ${backstage_config}

sed -i "s|\${POSTGRES_HOSTNAME}|${POSTGRES_HOSTNAME}|g" ${backstage_config}
sed -i "s|\${POSTGRES_PORT}|${POSTGRES_PORT}|g" ${backstage_config}
sed -i "s|\${POSTGRES_USER}|${POSTGRES_USER}|g" ${backstage_config}
sed -i "s|\${POSTGRES_PASSWORD}|${POSTGRES_PASSWORD}|g" ${backstage_config}

# I could not make env load via dotenv, so we have to replace it like this
# TO-DO: figure it out
cp ././backstage/plugins/weather/src/components/WeatherFetchComponent/WeatherFetchComponent.tsx.placeholder ./backstage/plugins/weather/src/components/WeatherFetchComponent/WeatherFetchComponent.tsx
sed -i "s|\${WEATHER_API_KEY}|${WEATHER_API_KEY}|g" ./backstage/plugins/weather/src/components/WeatherFetchComponent/WeatherFetchComponent.tsx 

# Generate a certificate and private key required for Backstage HTTPS
openssl genrsa -out backstage/private_key.pem 2048 && openssl req -new -key backstage/private_key.pem -out backstage/cert_request.pem -subj "/CN=Test" && openssl x509 -req -days 365 -in backstage/cert_request.pem -signkey backstage/private_key.pem -out backstage/cert.pem && rm -rf backstage/cert_request.pem

