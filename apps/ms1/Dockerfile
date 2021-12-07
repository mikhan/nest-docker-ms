FROM node:16.13.1-alpine

WORKDIR /usr/src/app

COPY ./dist/apps/ms1/package.json ./package.json
COPY ./yarn.lock ./yarn.lock

RUN yarn

COPY ./dist/apps/ms1 ./

CMD node main
