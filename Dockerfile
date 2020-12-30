# using alpine because it is small apparently
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

# config file for deep linking
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# remove default nginx page
RUN rm -rf /usr/share/nginx/html

COPY --from=build /usr/src/app/dist/* ./
