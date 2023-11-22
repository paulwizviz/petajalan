#!/bin/bash

# Copyright 2023 Paul Sitoh
# 
# Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

SCRIPT="$0"
COMMAND="$1"
SUBCOMMAND="$2"

export APP_IMAGE_NAME=petajalan/petajalan:current
export APP_CONTAINER_NAME=petajalan_prod
export DEV_CONTAINER_NAME=petajalan_dev
export NETWORK=petajalan_network

function build() {
    docker-compose -f ./build/builder.yaml build
}

function clean() {
    docker rm -f ${APP_CONTAINER_NAME}
    docker rm -f ${DEV_CONTAINER_NAME}
    docker rmi -f ${APP_IMAGE_NAME}
    docker rmi -f $(docker images --filter "dangling=true" -q)
}

function dev(){
    cmd="$1"
    case $cmd in
        "start")
            docker-compose -f ./deployment/dev.yaml up
            ;;
        "stop")
            docker-compose -f ./deployment/dev.yaml down
            ;;
        *)
            echo "Usage: ${SCRIPT} dev command
            
command:
    start development
    stop  development" 
            ;;
    esac
    
}

function prod(){
    cmd="$1"
    case $cmd in
        "start")
            docker-compose -f ./deployment/prod.yaml up
            ;;
        "stop")
            docker-compose -f ./deployment/prod.yaml down
            ;;
        *)
            echo "Usage: ${SCRIPT} prod command

command:
    start development
    stop  development" 
            ;;
    esac
}

message="Usage: $0 command

command:
    build  images
    clean  images
    dev    start dev container
    run    container"


case $COMMAND in
    "build")
        build
        ;;
    "clean")
        clean
        ;;
    "dev")
        dev $SUBCOMMAND
        ;;
    "prod")
        prod $SUBCOMMAND
        ;;
    *)
       echo "Usage: $0 command

command:
    build  images
    clean  containers and images
    dev    development environment
    prod   production environment"
        ;;
esac