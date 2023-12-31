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

# node build phase
# In this phase, we pull artefacts to build ReactJS webapp for
# development

ARG NODE_VER
ARG GO_VER

FROM node:${NODE_VER} as nodebuild

ARG WEB_FRAMEWORK

WORKDIR /opt

COPY ./web/${WEB_FRAMEWORK}/package-lock.json ./package-lock.json
COPY ./web/${WEB_FRAMEWORK}/package.json /opt/package.json
COPY ./web/${WEB_FRAMEWORK}/webpack /opt/webpack
COPY ./web/${WEB_FRAMEWORK}/.babelrc /opt/.babelrc
COPY ./web/${WEB_FRAMEWORK}/images /opt/images
COPY ./web/${WEB_FRAMEWORK}/src /opt/src

RUN npm install && npm run build

# Go build phase
# Utilising a go packaging tool github.com/GeertJohan/go.rice
# the web artefacts is packaged into a file name rice-box.go.
# Go builder then generates a version for linux platform.
FROM golang:${GO_VER} as gobuild

ARG APP_NAME

WORKDIR /opt

COPY ./cmd ./cmd
COPY ./internal ./internal
COPY --from=nodebuild /opt/public/index.html ./internal/handler/index.html
COPY --from=nodebuild /opt/public/bundle.js ./internal/handler/bundle.js
COPY --from=nodebuild /opt/public/images ./internal/handler/images

COPY ./go.mod ./go.mod
COPY ./go.sum ./go.sum

# Replace app name {./cmd/goreact} here with name of your choice {./cmd/<your-choice>}
RUN go mod download && \
    env CGO_ENABLED=0 env GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o ./build/${APP_NAME} ./cmd/petajalan

# Pack linux artefact into scratch container
FROM scratch

ARG APP_NAME

# Replace app name {goreact} here with name of your choice
COPY --from=gobuild /opt/build/${APP_NAME} /${APP_NAME}

# CMD /${APP_NAME} start ui
