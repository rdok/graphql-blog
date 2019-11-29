#!/bin/bash

PROJECT_DIR="$(
  # shellcheck disable=SC2164
  cd "$(dirname "$0")"
  pwd -P
)/.."

docker-compose-react() {
  docker-compose \
    --project-directory "${PROJECT_DIR}" \
    --project-name "${DOCKER_COMPOSE_PROJECT_NAME}" \
    --file "${PROJECT_DIR}/docker/docker-compose.yml" \
    --file "${PROJECT_DIR}/docker/docker-compose.production.yml" \
    "$@"
}

docker-compose-react build --pull
docker-compose-react down --remove-orphans
docker-compose-react up -d
