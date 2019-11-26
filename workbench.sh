#!/bin/bash

# This is the entrypoint for any of your node/npm working needs.
# On the first run on a machine, it will create a container, the workbench
# with all the tools you might require out of the box.

PROJECT_DIR="$(
  # shellcheck disable=SC2164
  cd "$(dirname "$0")"
  pwd -P
)"

workbenchContainer='graphql-blog_workbench'

if [ ! "$(docker ps --quiet --filter name=${workbenchContainer})" ]; then
  echo "${workbenchContainer} container not found."

  if [ "$(docker ps -aq -f status=exited -f name=${workbenchContainer})" ]; then
    echo 'Clean up previous build'
    docker rm ${workbenchContainer}
  fi

  echo "Creating container."
  docker-compose -f docker/docker-compose.local.yml \
    --project-directory "${PROJECT_DIR}" \
    up \
    --detach workbench

  echo "Checking health status."
  stateStatus=$(docker inspect -f '{{.State.Status}}' "${workbenchContainer}")
  until [ "$stateStatus" == "running" ]; do
    echo 'Waiting for container to be created'
    sleep 1
  done
fi

docker exec -it "${workbenchContainer}" "$@"
