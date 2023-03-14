#!/bin/bash

# Load the environment variables from the file
source .env

# File with Backstage configuration
backstage_config="./backstage/app-config.yaml"

# Update the YAML file with placeholders
sed -i "s|\${BACKSTAGE_HOSTNAME}|${BACKSTAGE_HOSTNAME}|g" ${backstage_config}

sed -i "s|\${POSTGRES_CONTAINER_NAME}|${POSTGRES_CONTAINER_NAME}|g" ${backstage_config}
sed -i "s|\${POSTGRES_PORT}|${POSTGRES_PORT}|g" ${backstage_config}
sed -i "s|\${POSTGRES_USER}|${POSTGRES_USER}|g" ${backstage_config}
sed -i "s|\${POSTGRES_PASSWORD}|${POSTGRES_PASSWORD}|g" ${backstage_config}

# Print the updated YAML file
cat ${backstage_config}
