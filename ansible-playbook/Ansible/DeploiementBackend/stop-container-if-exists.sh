#!/bin/bash

if [[ $(docker ps -q -f name=$1) ]]; then
    echo "Stopping and removing container $1..."
    docker stop $1
    docker rm $1
else
    echo "Container $1 doesn't exist."
fi
