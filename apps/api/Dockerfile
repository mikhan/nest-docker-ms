FROM node:16.13.1-alpine

WORKDIR /usr/src/app

COPY ./dist/apps/api/package.json ./package.json
COPY ./yarn.lock ./yarn.lock

RUN yarn

COPY ./dist/apps/api ./
COPY ./public ./public

CMD node main