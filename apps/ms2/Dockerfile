FROM node:16.13.1-alpine

WORKDIR /usr/src/app

COPY ./dist/apps/ms2/package.json ./package.json
COPY ./yarn.lock ./yarn.lock

RUN yarn

COPY ./dist/apps/ms2 ./

CMD node main
