#!/bin/bash

PROJECT_DIR="$(
  # shellcheck disable=SC2164
  cd "$(dirname "$0")"
  pwd -P
)/.."

docker-compose-react() {
  --project-name graphql-blog-client \
    --file "${PROJECT_DIR}/docker/docker-compose.yml" \
    --file "${PROJECT_DIR}/docker/docker-compose.production.yml" \
    "$@"
}

docker-compose-react build --pull
docker-compose-react down --remove-orphans
docker-compose-react up -d

