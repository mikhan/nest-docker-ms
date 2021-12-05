FROM node:16.13.1-alpine

WORKDIR /usr/src/app

COPY ./dist/apps/api .
COPY ./public ./public

RUN yarn

CMD node main