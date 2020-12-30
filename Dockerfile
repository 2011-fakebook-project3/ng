# using alpine because it is small apparently
FROM node:12.7-alpine AS build

WORKDIR /usr/src/app

# restore dependencies
COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.17.1-alpine

# config file for deep linking
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# remove default nginx page
RUN rm -rf /usr/share/nginx/html

# Copy compiled files from build
COPY --from=build /usr/src/app/dist/fakebook /usr/share/nginx/html