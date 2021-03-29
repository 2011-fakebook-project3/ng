# using alpine because it is small apparently
FROM node:14-alpine AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . ./

RUN npx ng build --prod

FROM nginx:1.18-alpine

WORKDIR /usr/share/nginx/html


RUN rm -rf *

# config file for deep linking
COPY src/nginx-custom.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/dist/* ./
