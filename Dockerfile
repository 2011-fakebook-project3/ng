# Dockerfile
# https://medium.com/@wkrzywiec/build-and-run-angular-application-in-a-docker-container-b65dbbc50be8
# Stage 1:  Build 

FROM node:12.7-alpine AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci 

COPY . ./

RUN npx ng build --prod 

WORKDIR /usr/share/nginx/html

# Stage 2: Run

FROM nginx:1.18

RUN rm -rf *

COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# Copy compiled files from previous build stage

COPY --from=build /usr/src/app/dist/* ./