FROM node:16.13.1-alpine

WORKDIR /usr/src/app

COPY ./dist/apps/ms2 .

RUN yarn

CMD node main
