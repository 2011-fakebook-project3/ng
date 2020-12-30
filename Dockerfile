# using alpine because it is small apparently
FROM node:12.7-alpine AS build

WORKDIR /usr/src/app

<<<<<<< HEAD
COPY package.json package-lock.json ./
=======
# restore dependencies
COPY package.json ./
>>>>>>> 51fe95c36f18c2d39c07dc9fafb0b411dbe2bb9e

RUN npm ci 

COPY . ./

RUN npx ng build --prod 

WORKDIR /usr/share/nginx/html

<<<<<<< HEAD
# Stage 2: Run

FROM nginx:1.18

RUN rm -rf *

COPY nginx-custom.conf /etc/nginx/conf.d/default.conf
=======
FROM nginx:1.17.1-alpine
>>>>>>> 51fe95c36f18c2d39c07dc9fafb0b411dbe2bb9e

# config file for deep linking
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# remove default nginx page
RUN rm -rf /usr/share/nginx/html

<<<<<<< HEAD
COPY --from=build /usr/src/app/dist/* ./
=======
# Copy compiled files from build
COPY --from=build /usr/src/app/dist/fakebook /usr/share/nginx/html
>>>>>>> 51fe95c36f18c2d39c07dc9fafb0b411dbe2bb9e
