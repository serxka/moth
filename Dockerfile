FROM node:lts-alpine as builder
RUN apk add --no-cache openssl-dev
WORKDIR /usr/src/moth
COPY . .
# Build watame_api
WORKDIR /usr/src/moth/watame_api
RUN npm install
RUN npm run build
# Build moth
WORKDIR /usr/src/moth
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=builder /usr/src/moth/build/ /var/www/moth/
