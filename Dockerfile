# # base image
# FROM node:12.2.0

# # set working directory
# WORKDIR /app

# # add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# # install and cache app dependencies
# COPY package.json /app/package.json
# RUN npm install
# RUN npm install -g @angular/cli@7.3.9

# # add app
# COPY . /app

# # start app
# CMD ng serve --host 0.0.0.0

# Dockerfile
# https://medium.com/@wkrzywiec/build-and-run-angular-application-in-a-docker-container-b65dbbc50be8
# Stage 1:  Build 

FROM node:12.7-alpine AS build

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Run

FROM nginx:1.17.1-alpine

# Copy compiled files from previous build stage

COPY --from=build /usr/src/app/dist/fakebook /usr/share/nginx/html