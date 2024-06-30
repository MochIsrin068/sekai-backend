#!/bin/bash

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# Build Docker image with build arguments
docker build \
  --build-arg PORT=$PORT \
  --build-arg DB_HOST=$DB_HOST \
  --build-arg DB_USERNAME=$DB_USERNAME \
  --build-arg DB_PASSWORD=$DB_PASSWORD \
  --build-arg DB_NAME=$DB_NAME \
  --build-arg JWT_SECRET=$JWT_SECRET \
  -t sekai-api .


# Need chmod +x build.sh before running .sh